"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";

import React, { PropsWithChildren } from "react";

export function CartProvider({ children }: PropsWithChildren) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="http://localhost:3000"
      cancelUrl="http://localhost:3000/nowosci"
      currency="BGN"
      billingAddressCollection
      shouldPersist
      language="bg-BG"
      allowedCountries={["BG"]}
      persistKey="cliffrise"
    >
      {children}
    </USCProvider>
  );
}
