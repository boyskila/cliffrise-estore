import db from "@/lib/db";
import { Product } from "@/types/product";
import Stripe from "stripe";

const products = [
  {
    id: 2,
    name: "Massage ring",
    price: Number("10.00"),
    thumbnail:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/massage_rings.png",
    description:
      "Climbing finger tape is used for protection and structural support in climbing.",
  },
  {
    id: 1,
    name: "Finger tape",
    price: Number("5.00"),
    thumbnail:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/fingertape.png",
    description:
      "Climbing finger tape is used for protection and structural support in climbing. Taping can help prevent injuries to muscles and joints in your fingers when climbing.",
  },
  {
    id: 4,
    name: "Hand massage ring",
    price: Number("10.00"),
    thumbnail:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/hand_ring.png",
    description: null,
  },
  {
    id: 3,
    name: "Chunky chalk",
    price: Number("15.00"),
    thumbnail:
      "https://bucket-production-d1d9.up.railway.app/cliffrise-products-images/chunky_chalk.jpg",
    description: null,
  },
];

export const getAllProducts = async () => {
  // const { rows } = await db.query<Product>(
  //   "SELECT id, name, price, thumbnail, description FROM products"
  // );
  db;
  const stripe = new Stripe(
   process.env.STRIPE_API_KEY ?? ''
  );
  const prods = await stripe.products.retrieve(process.env.STRIPE_RETRIEVE_KEY ?? '');
  const all = await stripe.products.list();
  console.log({ prods, all: all.data });

  return products;
};
