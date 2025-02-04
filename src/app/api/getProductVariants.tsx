import db from "@/lib/db";
import { Product } from "@/types/product";

export const getProductVariants = async (productName: string) => {
  const { rows } = await db.query<Product>(
    `SELECT * FROM products WHERE name = '${productName}'`
  );
  return rows;
};
