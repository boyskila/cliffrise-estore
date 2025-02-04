import { Product } from "@/types/product";
import { Variant } from "./Variant";

type Props = {
  products: Product[];
};

export const VariantSelector = ({ products }: Props) => {
  if (!products.length || !products[0].variant_type) {
    return null;
  }

  return <Variant products={products} />;
};
