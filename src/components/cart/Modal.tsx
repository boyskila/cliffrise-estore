"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { CartButton } from "./CartButton";
import { DeleteItemButton } from "./DeleteItemButton";
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import { DEFAULT_CURRENCY } from "@/constants";
import { appFetch } from "@/lib/fetch";

export const DEFAULT_OPTION = "Default Title";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const router = useRouter();
  const {
    cartCount,
    incrementItem,
    decrementItem,
    removeItem,
    cartDetails,
    handleCartClick,
    handleCloseCart,
    shouldDisplayCart,
    formattedTotalPrice,
    currency = DEFAULT_CURRENCY,
  } = useShoppingCart();

  const openCart = () => handleCartClick();
  const closeCart = () => handleCloseCart();

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <CartButton quantity={cartCount} />
      </button>
      <Transition show={shouldDisplayCart}>
        <Dialog onClose={closeCart} className="relative z-50">
          <div
            className="backdrop-blur-[1px] fixed inset-0 bg-black/30"
            aria-hidden="true"
          />
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                    <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
                  </div>
                </button>
              </div>

              {!cartCount ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {Object.values(cartDetails ?? {})
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(({ price, id, name, image = "" }, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        const merchandiseUrl = createUrl(
                          `/product/${name}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton
                                  onAction={() => {
                                    removeItem(id);
                                  }}
                                />
                              </div>
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
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">
                                      {name}
                                    </span>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                      {name}
                                    </p>
                                  </div>
                                </Link>
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
                                  <EditItemQuantityButton
                                    type="minus"
                                    onClick={() => {
                                      decrementItem(id);
                                    }}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {cartDetails && cartDetails[id]?.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    type="plus"
                                    onClick={() => {
                                      incrementItem(id, { count: 1 });
                                    }}
                                  />
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
                  <button
                    onClick={async () => {
                      try {
                        const { redirectPath } = await appFetch<{
                          redirectPath: string;
                        }>("/api/checkout/");
                        router.push(redirectPath);
                        closeCart();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
