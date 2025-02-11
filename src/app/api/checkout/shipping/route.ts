import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.address) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { get, set } = await cookies();
  const cookieValue = get("checkout_data")?.value;
  if (!cookieValue) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  const checkoutData = JSON.parse(cookieValue);
  set("checkout_data", JSON.stringify({ ...checkoutData, ...data }));
  set("checkout_step", "shipping");

  return NextResponse.json({ success: true });
}
