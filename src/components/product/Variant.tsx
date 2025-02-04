"use client";

import { Product } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type Props = {
  products: Product[];
};

export const Variant = ({ products }: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const type = products[0].variant_type;
  const currentTypeValue = type && searchParams.get(type);

  return (
    <dl className="mb-8">
      <dt className="mb-4 text-sm uppercase tracking-wide">{type}</dt>
      <dd className="flex flex-wrap gap-3">
        {products.map((product) => {
          const { variant_value } = product;
          return (
            <Link
              scroll={false}
              href={`/product/${params.slug}?${type}=${variant_value}`}
              key={variant_value}
              className={classNames(
                "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                {
                  "cursor-default ring-2 ring-blue-600":
                    variant_value === currentTypeValue,
                }
              )}
            >
              {variant_value}
            </Link>
          );
        })}
      </dd>
    </dl>
  );
};
