import { Product as SCProduct } from "use-shopping-cart/core";

export type Product = SCProduct & {
  thumbnail: string;
  variant_type?: string;
  variant_value?: string;
};
