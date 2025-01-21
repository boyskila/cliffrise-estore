import { Product } from "@/types/product";
import { Variant } from "./Variant";

export type ProductVariant = Product & {
  variant_name: string;
  value: string;
  img_url?: string;
};

export async function VariantSelector({
  productVariants,
}: {
  productVariants: ProductVariant[];
}) {
  if (!productVariants.length) {
    return null;
  }

  const options = productVariants.reduce<Record<string, ProductVariant[]>>(
    (acc, variant) => {
      return {
        ...acc,
        [variant.variant_name]: acc[variant.variant_name]
          ? [...acc[variant.variant_name], variant]
          : [variant],
      };
    },
    {}
  );

  return Object.entries(options).map(([key, option]) => {
    // const variants = JSON.parse(option.variants);
    return <Variant key={key} type={key} option={option} />;
    // console.log(option.variants);

    return null;
  });
}
