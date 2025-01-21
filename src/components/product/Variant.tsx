"use client";

import { useProduct } from "@/context/Product";
import classNames from "classnames";
import { useState } from "react";
import { ProductVariant } from "./Variants";

export const Variant = ({
  option,
  type,
}: {
  option: ProductVariant[];
  type: string;
}) => {
  const { selectedProductVariant, setSelectedProductVariant } = useProduct();

  return (
    <dl className="mb-8">
      <dt className="mb-4 text-sm uppercase tracking-wide">{type}</dt>
      <dd className="flex flex-wrap gap-3">
        {option.map((product) => {
          const { value } = product;
          return (
            <button
              onClick={() => {
                setSelectedProductVariant(product);
              }}
              key={value}
              className={classNames(
                "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                {
                  "cursor-default ring-2 ring-blue-600":
                    value === selectedProductVariant?.value,
                }
              )}
            >
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  );
};
