import db from "@/lib/db";
import { Product } from "@/types/product";

export const getAllProductsByName = async (name: string) => {
  const { rows } = await db.query<Product>(
    `SELECT id, name, price, thumbnail, description, variants FROM products WHERE name = '${name}'`
  );
  console.log({ byName: rows });

  return rows;
};
