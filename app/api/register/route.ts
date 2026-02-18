import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import TeamRegistration from "@/models/Registration";
// import { appendToSheet } from "@/lib/googleSheets"; // 👈 NEW IMPORT

export interface TeamMember {
  name: string;
  roll: string;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { teamName, members } = body;

    if (!teamName || !members) {
      return NextResponse.json(
        { message: "Team name and members are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(members) || members.length < 1 || members.length > 3) {
      return NextResponse.json(
        { message: "Team must have 1 to 3 members" },
        { status: 400 }
      );
    }

    for (const member of members) {
      if (!member.name || !member.roll || !member.email) {
        return NextResponse.json(
          { message: "All member fields are required" },
          { status: 400 }
        );
      }
    }

    const emails = members.map((m: TeamMember) =>
      m.email.toLowerCase().trim()
    );

    if (new Set(emails).size !== emails.length) {
      return NextResponse.json(
        { message: "Duplicate emails are not allowed in the same team" },
        { status: 400 }
      );
    }

    const existingTeam = await TeamRegistration.findOne({
      teamName: teamName.trim(),
    });

    if (existingTeam) {
      return NextResponse.json(
        { message: "Team name already taken" },
        { status: 409 }
      );
    }

    // 1️⃣ Save to MongoDB (Primary Database)
    const saved = await TeamRegistration.create({
      teamName: teamName.trim(),
      members,
    });

    // 2️⃣ Save to Google Sheets (Secondary Backup)
    // await appendToSheet(teamName.trim(), members);

    return NextResponse.json(
      {
        message: "Team registered successfully",
        saved,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Team Registration Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
