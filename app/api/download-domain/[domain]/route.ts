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
    
    let domain = decodeURIComponent(rawDomain);

    if (domain === "AI-ML") {
      domain = "AI/ML";
    }
    if (domain === "UI-UX") {
      domain = "UI/UX";
    }
    
    console.log(`Searching for domain: "${domain}"`);

    await dbConnect();

    const escapedDomain = domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    const domainRegex = new RegExp(`^${escapedDomain}$`, "i");

    const domain1Users = await Registration.find({ domain1: { $regex: domainRegex } });
    console.log(`Found ${domain1Users.length} users in Domain 1`);

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

    const finalSheet = section1;

    const worksheet = XLSX.utils.json_to_sheet(finalSheet);
    const workbook = XLSX.utils.book_new();

    let safeSheetName = domain.replace(/[:\/?*\[\]\\]/g, "-");
    
    if (safeSheetName.length > 31) {
      safeSheetName = safeSheetName.substring(0, 31);
    }
    if (!safeSheetName) {
      safeSheetName = "Registrations";
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);

    const wscols = [
        { wch: 20 }, 
        { wch: 30 }, 
        { wch: 15 }, 
        { wch: 10 }, 
        { wch: 30 }, 
        { wch: 25 }, 
        { wch: 25 }, 
        { wch: 35 }, 
        { wch: 20 }, 
        { wch: 15 }, 
    ];
    worksheet["!cols"] = wscols;

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${safeSheetName}_registrations.xlsx"`,
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