import db from "@/lib/db";
import { Product } from "@/types/product";

export const getAllProducts = async () => {
  const { rows } = await db.query<Product>("SELECT * FROM products");
  return rows;
};
