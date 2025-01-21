"use client";

import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { CloseIcon } from "./CloseIcon";
import { CartButton } from "./CartButton";
import { LoadingDots } from "../LoadingDots";
import { Price } from "../Price";
import { useCart } from "@/context/Cart";
import { DeleteItemButton } from "./DeleteItemButton";
import { ReadonlyURLSearchParams } from "next/navigation";
import { EditItemQuantityButton } from "./EditItemQuantityButton";

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
  const { cart, removeCartItem, addCartItem, isOpen, setIsOpen } = useCart();
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartAmount = cart.reduce((finalAmount, { price }) => {
    return finalAmount + parseFloat(price as any);
  }, 0);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <CartButton quantity={cart.length} />
      </button>
      <Transition show={isOpen}>
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
                  <CloseIcon />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .filter((item, index, self) => {
                        return (
                          index ===
                          self.findIndex(
                            (t) => t.id === item.id && t.value === item.value
                          )
                        );
                      })
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        const merchandiseUrl = createUrl(
                          `/product/${item.name}`,
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
                                    removeCartItem(item);
                                  }}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={item.name}
                                    src={item.img_url ?? item.thumbnail}
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">
                                      {item.name}
                                    </span>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.price}
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    type="minus"
                                    onClick={() => {
                                      removeCartItem(item, false);
                                    }}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {
                                        cart.filter(
                                          ({ value }) => value === item.value
                                        ).length
                                      }
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    type="plus"
                                    onClick={() => {
                                      addCartItem(item);
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
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cartAmount}
                      />
                    </div>
                  </div>
                  <CheckoutButton />
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <Link
      href="/checkout"
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
    >
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
    </Link>
  );
}
