import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const { get, set } = await cookies();
  const checkoutData = get("checkout_data")?.value;
  const { steps } = checkoutData ? JSON.parse(checkoutData) : {};

  if (steps?.shipping) {
    return NextResponse.json({
      success: true,
      redirectPath: "/checkout/payment",
    });
  }

  set("checkout_session", "checkout-session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // Expires after 1 day
  });

  return NextResponse.json({
    success: true,
    redirectPath: "/checkout/information",
  });
}
