"use client";

import { ProductVariant } from "@/components/product/Variants";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/lib/localStorage";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  cart: ProductVariant[];
  addCartItem: (variant: ProductVariant) => void;
  removeCartItem: (
    variant: ProductVariant,
    shouldRemoveAllVariants?: boolean
  ) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<ProductVariant[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addCartItem = (variant: ProductVariant) => {
    setCart([...cart, variant]);
  };

  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const removeCartItem = (
    variant: ProductVariant,
    shouldRemoveAllVariants = true
  ) => {
    let removed = false;
    setCart(
      cart.filter(({ id, value }) => {
        if (removed) {
          return true;
        }
        if (id === variant.id && value === variant.value) {
          removed = !shouldRemoveAllVariants;
          return false;
        }
        return true;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ addCartItem, cart, removeCartItem, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = use(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
