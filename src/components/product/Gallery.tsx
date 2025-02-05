"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";
import { Product } from "@/types/product";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const buttonClassName =
  "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

type Props = {
  products: Product[];
};

type ImageProps = {
  altText: string;
  src: string;
};

export function Gallery({ products }: Props) {
  const searchParams = useSearchParams();
  const product = products.find((p) => p.thumbnail) ?? products[0];
  const typeValueFromParams =
    product.variant_type && searchParams.get(product.variant_type);
  const selectedProductIndex = products.findIndex(
    (product) => product.variant_value === typeValueFromParams
  );
  const [imageIndex, setImageIndex] = useState(
    selectedProductIndex > -1 ? selectedProductIndex : 0
  );

  useEffect(() => {
    setImageIndex(selectedProductIndex > -1 ? selectedProductIndex : 0);
  }, [selectedProductIndex]);

  const images = products.reduce((acc, product) => {
    return [
      ...acc,
      {
        altText: "",
        src: product.image ?? "",
      },
    ];
  }, [] as ImageProps[]);

  const imagesCount = images.length;

  return (
    <div>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex].altText}
            src={images[imageIndex].src}
            priority={true}
          />
        )}

        <div className="absolute bottom-[15%] flex w-full justify-center">
          <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
            <button
              aria-label="Previous product image"
              className={buttonClassName}
              onClick={() => {
                setImageIndex(
                  imageIndex === 0 ? imagesCount - 1 : imageIndex - 1
                );
              }}
            >
              <ArrowLeftIcon className="h-5" />
            </button>
            <div className="mx-1 h-6 w-px bg-neutral-500"></div>
            <button
              aria-label="Next product image"
              className={buttonClassName}
              onClick={() => {
                setImageIndex(
                  imageIndex === imagesCount - 1 ? 0 : imageIndex + 1
                );
              }}
            >
              <ArrowRightIcon className="h-5" />
            </button>
          </div>
        </div>
      </div>

      <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
        {images.map(({ src, altText }, index) => {
          const isActive = index === imageIndex;

          return (
            <li key={src} className="h-20 w-20">
              <button
                aria-label="Select product image"
                className="h-full w-full"
                onClick={() => setImageIndex(index)}
              >
                <div
                  className={classNames(
                    "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black",
                    {
                      "border-2 border-blue-600": isActive,
                      "border-neutral-200 dark:border-neutral-800": !isActive,
                    }
                  )}
                >
                  <Image
                    alt={altText}
                    src={src}
                    width={80}
                    height={80}
                    className="relative h-full w-full object-contain"
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
