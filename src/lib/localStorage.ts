import { ProductVariant } from "@/components/product/Variants";

export const saveCartToLocalStorage = (cart: ProductVariant[]) => {
  localStorage.setItem("cliffrise_cart", JSON.stringify(cart ?? []));
};

export const getCartFromLocalStorage = (): ProductVariant[] => {
  const cart = localStorage.getItem("cliffrise_cart");
  return JSON.parse(cart ?? "[]");
};

export const saveSelecteProductToLocalStorage = (product: ProductVariant) => {
  product &&
    localStorage.setItem("cliffrise_selected_product", JSON.stringify(product));
};

export const getSelectedProductFromLocalStorage = (): ProductVariant => {
  const product = localStorage.getItem("cliffrise_selected_product");
  return product ? JSON.parse(product) : undefined;
};
