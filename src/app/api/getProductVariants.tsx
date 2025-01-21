import { ProductVariant } from "@/components/product/Variants";
// import db from "@/lib/db";

const variants: ProductVariant[] = [
  {
    id: "3",
    name: "Chunky chalk",
    description: undefined,
    price: Number("15.00"),
    thumbnail:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/chunky_chalk.jpg",
    img_url: undefined,
    value: "300gr",
    variant_name: "Size",
    inStock: true,
  },
  {
    id: " 3",
    name: "Chunky chalk",
    description: undefined,
    price: Number("15.00"),
    thumbnail:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/chunky_chalk.jpg",
    img_url:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/chalk_bucket.jpg",
    value: "1000gr",
    variant_name: "Size",
    inStock: true,
  },
];

export const getProductVariants = async (productName: string) => {
  // const query = `
  //   SELECT
  //     products.id,
  //     products.name,
  //     products.description,
  //     products.price,
  //     products.thumbnail,
  //     product_variants.price AS variant_price,
  //     product_variants.img_url,
  //     product_variants.value,
  //     product_variants.name AS variant_name
  //   FROM
  //     products
  //   LEFT JOIN
  //     product_variants ON products.id = product_variants.product_id
  //   WHERE
  //     products.name = '${productName}';
  // `;
  // const { rows } = await db.query<ProductVariant>(query);
  // console.log({ variants: rows });

  // return rows;
  return new Promise<ProductVariant[]>((res) => {
    res(variants);
  });
};
