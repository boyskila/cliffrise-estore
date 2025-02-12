"use client";

import { FormEventHandler, useState } from "react";
import { loadStripe, StripeCardElement, StripeError } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const { cartDetails, clearCart } = useShoppingCart();

  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<StripeError["message"]>();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a PaymentIntent on the server
    const response = await fetch("/api/checkout/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartDetails }),
    });

    const { clientSecret } = await response.json();

    // Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement as StripeCardElement,
        },
      }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      clearCart();
      router.push("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <div>Test card: 4000001000000000</div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
