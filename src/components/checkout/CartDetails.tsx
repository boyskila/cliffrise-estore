"use client";

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { DEFAULT_CURRENCY } from "@/constants";
import { Suspense } from "react";

export const DEFAULT_OPTION = "Default Title";

export const CartDetails = () => {
  const {
    cartDetails,
    formattedTotalPrice,
    currency = DEFAULT_CURRENCY,
  } = useShoppingCart();

  return (
    <div className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">My Cart</p>
      </div>

      <div className="flex h-full flex-col justify-between overflow-hidden p-1">
        <ul className="flex-grow overflow-auto py-4">
          {Object.values(cartDetails ?? {})
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ price, id, name, image = "" }, i) => {
              return (
                <li
                  key={i}
                  className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                >
                  <div className="relative flex w-full flex-row justify-between px-1 py-4">
                    <div className="flex flex-row">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                        <Image
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                          alt={name}
                          src={image}
                        />
                      </div>
                    </div>
                    <div className="flex h-16 flex-col justify-between">
                      <div className="flex justify-end space-y-2 text-right text-sm">
                        {formatCurrencyString({
                          value: price,
                          currency,
                          language: "bg-BG",
                        })}
                      </div>
                      <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                        <p className="w-6 text-center">
                          <span className="w-full text-sm">
                            {cartDetails && cartDetails[id]?.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
            <p>Shipping</p>
            <p className="text-right">Calculated at checkout</p>
          </div>
          <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
            <p>Total</p>
            <div className="text-right text-base text-black dark:text-white">
              {formattedTotalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SuspendedCartDetails = () => {
  return (
    <Suspense fallback={<div>...LOading</div>}>
      <CartDetails />
    </Suspense>
  );
};
