import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Registration from "@/models/Registration";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
   
   
  if (!email) {
    return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
  }

  await dbConnect();
  const user = await Registration.findOne({ email });

  if (!user) {
    return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
