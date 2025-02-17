import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data["firstName"] || !data.email) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { set } = await cookies();
  set("checkout_data", JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // Expires after 1 day
  });
  set("checkout_step", "information", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // Expires after 1 day
  });
  set("checkout_session", "asdf", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // Expires after 1 day
  });

  return NextResponse.json({ success: true });
}
