"use client";

import Image from "next/image";
import { createShimmerPlaceholder } from "@/lib/images";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";

export const Gallery = ({ products }: { products: Product[] }) => {
  const searchParams = useSearchParams();
  const product = products.find((p) => p.thumbnail) ?? products[0];
  const typeValueFromParams =
    product.variant_type && searchParams.get(product.variant_type);
  const selectedProduct = products.find(
    (product) => product.variant_value === typeValueFromParams
  );

  return (
    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
      <Image
        className="h-full w-full object-contain"
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        alt={""}
        src={
          selectedProduct?.image ??
          selectedProduct?.thumbnail ??
          product.image ??
          ""
        }
        priority={true}
        placeholder={createShimmerPlaceholder()}
      />
    </div>
  );
};
