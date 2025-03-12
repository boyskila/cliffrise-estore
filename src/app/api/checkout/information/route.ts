import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { set } = cookies();
  set("checkout_data", JSON.stringify({ data, steps: { information: true } }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // Expires after 1 day
  });

  return NextResponse.json({ success: true });
}
