// app/api/create-payment-intent/route.js
import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { price, currency } = body.cartDetails;

  const { delete: deleteCookie } = await cookies();

  deleteCookie("checkout_data");
  deleteCookie("checkout_step");
  deleteCookie("checkout_session");

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Total amount in cents
      currency: "BGN",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create PaymentIntent" },
      { status: 500 }
    );
  }
}
