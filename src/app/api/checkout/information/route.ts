import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { set } = await cookies();
  set("checkout_data", JSON.stringify(data));
  set("checkout_step", "information");

  return NextResponse.json({ success: true });
}
