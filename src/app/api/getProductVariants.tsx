import { ProductVariant } from "@/components/product/Variants";
import db from "@/lib/db";

export const getProductVariants = async (productName: string) => {
  const query = `
    SELECT
      products.id,
      products.name,
      products.description,
      products.price,
      products.thumbnail,
      product_variants.price AS variant_price,
      product_variants.img_url,
      product_variants.value,
      product_variants.name AS variant_name
    FROM
      products
    LEFT JOIN
      product_variants ON products.id = product_variants.product_id
    WHERE
      products.name = '${productName}';
  `;
  const { rows } = await db.query<ProductVariant>(query);

  return rows;
};
