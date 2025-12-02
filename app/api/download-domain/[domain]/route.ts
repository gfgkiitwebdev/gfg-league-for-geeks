import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { dbConnect } from "@/lib/dbConnect";
import Registration from "@/models/Registration";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const resolvedParams = await params;
    const rawDomain = resolvedParams.domain;
    
    const domain = decodeURIComponent(rawDomain);

    await dbConnect();

    // Fetch Domain1 users
    const domain1Users = await Registration.find({ domain1: domain });

    // Fetch Domain2 users
    
    console.log(domain1Users);
    
    const domain2Users = await Registration.find({ domain2: domain });

    const section1 = domain1Users.map((u) => ({
      Name: u.username,
      Email: u.email,
      Contact: u.contact,
      Year: u.year,
      "Why GFG?": u.whyGfg,
      Github: u.github,
      LinkedIn: u.linkedin,
      Resume: u.resumeLink,
    }));

    const section2 = domain2Users.map((u) => ({
      Name: u.username,
      Email: u.email,
      Contact: u.contact,
      Year: u.year,
      "Why GFG?": u.whyGfg,
      Github: u.github,
      LinkedIn: u.linkedin,
      Resume: u.resumeLink,
    }));
    console.log(section1);
    
    const blankRow = [{}];

    const finalSheet = [...section1, ...blankRow, ...section2];

    const worksheet = XLSX.utils.json_to_sheet(finalSheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, domain);

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${domain}_registrations.xlsx"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Sheet Download Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 }
    );
  }
}