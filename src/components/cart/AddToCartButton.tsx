"use client";

import classNames from "classnames";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "use-shopping-cart";
import { DEFAULT_CURRENCY } from "@/constants";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";

const buttonClasses =
  "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
const disabledClasses = "cursor-not-allowed opacity-60";

export const AddToCartButton = ({ products }: { products: Product[] }) => {
  const searchParams = useSearchParams();
  const product = products[0];
  const typeValueFromParams =
    product.variant_type && searchParams.get(product.variant_type);
  const disabled = Boolean(!typeValueFromParams && product.variant_type);
  const {
    addItem,
    currency = DEFAULT_CURRENCY,
    handleCartClick,
  } = useShoppingCart();

  return (
    <button
      disabled={disabled}
      aria-label="Add to cart"
      className={classNames(buttonClasses, {
        "hover:opacity-90": !disabled,
        [disabledClasses]: disabled,
      })}
      onClick={() => {
        const { id, name, image, thumbnail, price } =
          products.find(
            (product) => product.variant_value === typeValueFromParams
          ) ?? product;
        addItem({
          id,
          name,
          price: price * 100,
          currency,
          image: image ?? thumbnail,
        });
        handleCartClick();
      }}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
};
