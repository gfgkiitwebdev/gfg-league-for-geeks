import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import TeamRegistration from "@/models/Registration";
import { dbConnect } from "@/lib/dbConnect";

type TeamMember = {
  name: string;
  roll: string;
  email: string;
};

type Team = {
  teamName: string;
  members: TeamMember[];
  createdAt?: Date;
};

type ExportRow = {
  TeamName: string;
  Member1_Name: string;
  Member1_Roll: string;
  Member1_Email: string;
  Member2_Name: string;
  Member2_Roll: string;
  Member2_Email: string;
  Member3_Name: string;
  Member3_Roll: string;
  Member3_Email: string;
  CreatedAt: string;
};

export async function GET() {
  try {
    await dbConnect();

    const teams = await TeamRegistration.find(
      {},
      {
        teamName: 1,
        members: 1,
        createdAt: 1,
      }
    ).lean<Team[]>();

    if (!teams || teams.length === 0) {
      return NextResponse.json(
        { message: "No data found" },
        { status: 404 }
      );
    }

    // One row per team (NO redundant repetition)
    const rows: ExportRow[] = teams.map((team) => {
      const m1 = team.members?.[0];
      const m2 = team.members?.[1];
      const m3 = team.members?.[2];

      return {
        TeamName: team.teamName,
        Member1_Name: m1?.name || "",
        Member1_Roll: m1?.roll || "",
        Member1_Email: m1?.email || "",
        Member2_Name: m2?.name || "",
        Member2_Roll: m2?.roll || "",
        Member2_Email: m2?.email || "",
        Member3_Name: m3?.name || "",
        Member3_Roll: m3?.roll || "",
        Member3_Email: m3?.email || "",
        CreatedAt: team.createdAt
          ? new Date(team.createdAt).toLocaleString()
          : "",
      };
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Optional: set column widths (makes sheet look clean)
    worksheet["!cols"] = [
      { wch: 20 }, // TeamName
      { wch: 18 }, { wch: 15 }, { wch: 25 }, // Member1
      { wch: 18 }, { wch: 15 }, { wch: 25 }, // Member2
      { wch: 18 }, { wch: 15 }, { wch: 25 }, // Member3
      { wch: 22 }, // CreatedAt
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition":
          "attachment; filename=team-registrations.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export XLSX Error:", error);
    return NextResponse.json(
      { message: "Failed to export data" },
      { status: 500 }
    );
  }
}