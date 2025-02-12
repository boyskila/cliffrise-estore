"use client";
import { MouseEvent } from "react";
import { SuspendedCartDetails } from "@/components/checkout/CartDetails";
import { useRouter } from "next/navigation";

const InfoPage = () => {
  const router = useRouter();
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const { target } = event as unknown as MouseEvent;
          const formData = new FormData(target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries());

          const response = await fetch("/api/checkout/information", {
            method: "POST",
            body: JSON.stringify(data),
          });

          if (response.ok) {
            router.push("/checkout/shipping");
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
