"use client";

export default function ShippingPage() {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/api/checkout/shipping", {
          method: "POST",
          body: JSON.stringify(data),
        });

        if (response.ok) {
          window.location.href = "/checkout/payment";
        }
      }}
    >
      <input type="text" name="address" placeholder="Address" required />
      <button type="submit">Next</button>
    </form>
  );
}
