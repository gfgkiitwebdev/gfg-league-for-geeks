import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import TeamRegistration from "@/models/Registration";

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

    // 1. Basic Presence Check
    if (!teamName || !members || !Array.isArray(members)) {
      return NextResponse.json({ message: "Invalid submission data" }, { status: 400 });
    }

    // 2. Team Size Validation
    if (members.length < 1 || members.length > 3) {
      return NextResponse.json({ message: "Team must have 1 to 3 members" }, { status: 400 });
    }

    for (const member of members) {
      const { name, roll, email } = member;

      if (!name || !roll || !email) {
        return NextResponse.json({ message: "All member fields are required" }, { status: 400 });
      }

      // --- ROLL NUMBER CHECK ---
      // Check if starts with 21, 22, 23, 24, or 25
      const rollStart = roll.trim().substring(0, 2);
      const validRollYears = ["21", "22", "23", "24", "25"];
      if (!validRollYears.includes(rollStart)) {
        return NextResponse.json(
          { message: `Invalid Roll Number: ${roll}. Only 2021-2025 batches allowed.` },
          { status: 400 }
        );
      }

      const emailLower = email.toLowerCase().trim();
      const isValidEmail = emailLower.endsWith("@kiit.ac.in") || emailLower.endsWith("@gmail.com");
      if (!isValidEmail) {
        return NextResponse.json(
          { message: `Invalid Email: ${email}. Use @kiit.ac.in or @gmail.com.` },
          { status: 400 }
        );
      }
    }

    // 4. Duplicate Check within the same team
    const emails = members.map((m: TeamMember) => m.email.toLowerCase().trim());
    if (new Set(emails).size !== emails.length) {
      return NextResponse.json({ message: "Duplicate emails found in team" }, { status: 400 });
    }

    // 5. Database Existence Check
    const existingTeam = await TeamRegistration.findOne({
      teamName: teamName.trim(),
    });

    if (existingTeam) {
      return NextResponse.json({ message: "Team name already taken" }, { status: 409 });
    }

    // 6. Save to MongoDB
    const saved = await TeamRegistration.create({
      teamName: teamName.trim(),
      members,
    });

    return NextResponse.json(
      { message: "Team registered successfully", saved },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Team Registration Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}