"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    await fetch("/api/checkout/shipping", {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    router.push("/checkout/payment");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="address"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">go to payment</button>
    </form>
  );
}
