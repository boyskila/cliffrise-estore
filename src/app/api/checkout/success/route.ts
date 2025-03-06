import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { delete: deleteCookie, set } = await cookies();
  if (body.completeSession) {
    deleteCookie("success_checkout");
    deleteCookie("checkout_data");
    deleteCookie("checkout_session");
  } else {
    set("success_checkout", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // Expires after 1 day
    });
  }
  return NextResponse.json({ success: true });
}
