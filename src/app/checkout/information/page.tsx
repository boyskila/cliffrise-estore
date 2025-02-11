"use client";
import { MouseEvent } from "react";
import { SuspendedCartDetails } from "@/components/checkout/CartDetails";

const InfoPage = () => {
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const { target } = event as unknown as MouseEvent;
          const formData = new FormData(target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries());

          // Send data to the server
          const response = await fetch("/api/checkout/information", {
            method: "POST",
            body: JSON.stringify(data),
          });

          if (response.ok) {
            // Redirect to the next step
            window.location.href = "/checkout/shipping";
          }
        }}
      >
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Next</button>
      </form>
      <SuspendedCartDetails />
    </div>
  );
};

export default InfoPage;
