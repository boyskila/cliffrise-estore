import { Price } from "@/components/Price";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "./api/getAllProducts";
import { createShimmerPlaceholder } from "@/lib/images";
import { headers } from "next/headers";

const gridItems = [
  "lg:h-[300]",
  "lg:h-[400]",
  "lg:h-[220]",
  "lg:h-[200]",
  "lg:h-[350]",
  "lg:h-[375]",
  "lg:h-[370]",
];

const Home = async () => {
  const header = await headers();
  const currentPath = header.get("x-current-path");
  console.log({ currentPath });

  const products = await getAllProducts();
  return (
    <section className="container mx-auto p-4">
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {[...products, ...products, products[0]].map(
          ({ name, thumbnail, price }, index) => {
            return (
              <li
                key={name + index}
                className="rounded-lg space-y-2 p-4 break-inside-avoid mb-6 bg-white border hover:border-blue-600 z-0 relative"
              >
                <Link href={`/product/${name}`}>
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={thumbnail}
                      placeholder={createShimmerPlaceholder()}
                      alt={name}
                      priority
                      width={400}
                      height={300}
                      className={`h-auto object-cover ${gridItems[index]} transition duration-300 ease-in-out hover:scale-105`}
                    />
                    <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                          {name}
                        </h3>
                        <Price
                          amount={price}
                          className="flex-none rounded-full bg-blue-600 p-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};

export default Home;
