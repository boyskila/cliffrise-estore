"use client";

import classNames from "classnames";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useProduct } from "@/context/Product";
import { useCart } from "@/context/Cart";

const buttonClasses =
  "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

export const AddToCartButton = () => {
  const { selectedProductVariant } = useProduct();
  const { addCartItem, setIsOpen } = useCart();
  return (
    <button
      aria-label="Add to cart"
      className={classNames(buttonClasses, {
        "hover:opacity-90": true,
        [disabledClasses]: !selectedProductVariant,
      })}
      onClick={() => {
        selectedProductVariant && addCartItem(selectedProductVariant);
        setIsOpen(true);
      }}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
};
