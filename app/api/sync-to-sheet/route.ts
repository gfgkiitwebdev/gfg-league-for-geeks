import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import TeamRegistration from "@/models/Registration";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzwUYRl8t1Rdrxc9mjCXwPorlz-OG-gNwz1KxtyFQJ1YqLZKk3kUQNCy2yP1nxvBmql/exec"; // 👈 replace

export async function GET() {
  try {
    await dbConnect();

    // 1️⃣ Fetch all teams from MongoDB
    const teams = await TeamRegistration.find({}).lean();

    if (!teams.length) {
      return NextResponse.json(
        { message: "No teams found in database" },
        { status: 200 },
      );
    }

    let successCount = 0;
    let failCount = 0;

    // 2️⃣ Push each team to Google Sheet via Apps Script
    for (const team of teams) {
      try {
        const payload = {
          teamName: team.teamName,
          members: team.members,
        };

        const res = await fetch(SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (error) {
        console.error("Failed to sync team:", team.teamName, error);
        failCount++;
      }
    }

    return NextResponse.json(
      {
        message: "Sync completed",
        total: teams.length,
        success: successCount,
        failed: failCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Bulk Sync Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
