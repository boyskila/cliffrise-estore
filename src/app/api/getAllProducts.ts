import db from "@/lib/db";
import { Product } from "@/types/product";

export const getAllProducts = async () => {
  const { rows } = await db.query<Product>(
    "SELECT id, name, price, thumbnail, description FROM products"
  );

  return rows;
};
