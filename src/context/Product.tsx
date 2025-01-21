"use client";

import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";
import { ProductVariant } from "@/components/product/Variants";
import {
  getSelectedProductFromLocalStorage,
  saveSelecteProductToLocalStorage,
} from "@/lib/localStorage";

const ProductContext = createContext<{
  selectedProductVariant: ProductVariant | undefined;
  setSelectedProductVariant: (variant: ProductVariant) => void;
}>({
  selectedProductVariant: undefined,
  setSelectedProductVariant: (_: any) => {},
});

export const useProduct = () => {
  const context = use(ProductContext);
  if (context) {
    return context;
  }
  throw new Error("useProduct must be used within a ProductProvider");
};

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ProductVariant>();

  useEffect(() => {
    setSelectedProductVariant(getSelectedProductFromLocalStorage());
  }, []);

  useEffect(() => {
    selectedProductVariant &&
      saveSelecteProductToLocalStorage(selectedProductVariant);
  }, [selectedProductVariant]);

  return (
    <ProductContext.Provider
      value={{ selectedProductVariant, setSelectedProductVariant }}
    >
      {children}
    </ProductContext.Provider>
  );
};
