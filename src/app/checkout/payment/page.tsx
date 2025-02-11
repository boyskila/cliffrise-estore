"use client";

import { useShoppingCart } from "use-shopping-cart";

export default function PaymentPage() {
  const { clearCart } = useShoppingCart();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/api/checkout/payment", {
          method: "POST",
          body: JSON.stringify(data),
        });

        if (response.ok) {
          clearCart();
          window.location.href = "/success";
        }
      }}
    >
      <input type="text" name="cardNumber" placeholder="Card Number" required />
      <button type="submit">Pay</button>
    </form>
  );
}
