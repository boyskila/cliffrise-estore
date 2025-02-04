import { notFound } from "next/navigation";
import { Price } from "@/components/Price";
import { VariantSelector } from "@/components/product/Variants";
import { getProductVariants } from "@/app/api/getProductVariants";
import { Gallery } from "@/components/product/Gallery";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const products = await getProductVariants(decodeURIComponent(params.slug));

  if (!products.length) {
    return notFound();
  }

  const { name, price, description } = products[0];

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <Gallery products={products} />
        </div>

        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium">{name}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
              <Price amount={price} />
            </div>
          </div>
          <VariantSelector products={products} />
          <div className="mb-6 text-sm leading-tight dark:text-white/[60%]">
            {description}
          </div>
          <AddToCartButton products={products} />
        </div>
      </div>
    </div>
  );
}
