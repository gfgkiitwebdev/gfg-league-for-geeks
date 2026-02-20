// import { registerRateLimit } from "@/lib/ratelimit";
import { NextResponse } from "next/server";

// app/api/save-to-sheet/route.ts
export async function POST(req: Request) {
  try {
    // const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // const { success } = await registerRateLimit.limit(ip);
    const body = await req.json();
    console.log(body);
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbzwUYRl8t1Rdrxc9mjCXwPorlz-OG-gNwz1KxtyFQJ1YqLZKk3kUQNCy2yP1nxvBmql/exec",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const data = await res.text();
    console.log(data);

    return new Response(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Server Error",
    });
  }
}
