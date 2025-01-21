import { notFound } from "next/navigation";
import { Price } from "@/components/Price";
import { VariantSelector } from "@/components/product/Variants";
import { getProductVariants } from "@/app/api/getProductVariants";
import { Gallery } from "@/components/product/Gallery";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getSelectedProductFromLocalStorage } from "@/lib/localStorage";

export default async function ProductPage(props: any) {
  const params = await props.params;

  const products = await getProductVariants(decodeURIComponent(params.slug));

  const product = products[0];

  if (!products.length) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <Gallery />
        </div>

        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
              <Price amount={product.price} />
            </div>
          </div>
          <VariantSelector productVariants={products} />
          <div className="mb-6 text-sm leading-tight dark:text-white/[60%]">
            {product.description}
          </div>
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
}
