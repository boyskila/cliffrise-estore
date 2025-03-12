import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const calculateDeliveryFee = (address: string) => {
  /**
   * In real world I should make a call to Ekont or Speedy API
   * in order to calculate the delivery fee
   */
  return address.includes("Sofia") ? 10 : 20;
};

export async function POST(request: NextRequest) {
  const { address } = await request.json();

  if (!address) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const deliveryFee = calculateDeliveryFee(address);

  const { get, set } = cookies();
  const cookieValue = get("checkout_data")?.value;
  if (!cookieValue) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const checkoutData = JSON.parse(cookieValue);

  set(
    "checkout_data",
    JSON.stringify({
      ...checkoutData,
      address,
      deliveryFee,
      steps: { ...checkoutData.steps, shipping: true },
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // Expires after 1 day
    }
  );

  return NextResponse.json({ success: true });
}
