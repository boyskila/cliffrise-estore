import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.cardNumber) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { delete: deleteCookie } = await cookies();

  deleteCookie("checkout_data");
  deleteCookie("checkout_step");

  return NextResponse.json({ success: true });
}
