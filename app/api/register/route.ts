import { NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect } from "@/lib/dbConnect";
import Registration from "@/models/Registration";

const registrationSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().regex(/^[0-9]{10}$/, "Contact must be a 10-digit number"),
  email: z
    .string()
    .email("Invalid email format")
    .regex(/@kiit\.ac\.in$/, "Only KIIT email allowed"),
  year: z.enum(["1", "2", "3"]),

  resumeLink: z.string().optional(),

  github: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),

  whyGfg: z.string().min(5, "Please explain why you want to join"),

  domain1: z.string().min(1, "Domain 1 is required"),
  deviceId: z.string().min(8, "Invalid device fingerprint"),
  avatar: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(flat)[0]?.[0] || "Validation Failed";

      return NextResponse.json(
        {
          success: false,
          message: firstError,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Connect to DB
    await dbConnect();
    const existingDevice = await Registration.findOne({
      deviceId: data.deviceId,
    });

    if (existingDevice) {
      return NextResponse.json(
        {
          success: false,
          message: "This device has already submitted the form.",
        },
        { status: 400 }
      );
    }

    // Prevent duplicate email
    const existing = await Registration.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered",
        },
        { status: 400 }
      );
    }

    // Save to DB
    const saved = await Registration.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully!",
        saved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const data = await Registration.findById(id);
      if (!data) {
        return NextResponse.json(
          { success: false, message: "Registration not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    }

    // If no ID, fetch all
    const data = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 }
    );
  }
}
