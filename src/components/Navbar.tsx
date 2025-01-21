import Link from "next/link";
import { Suspense } from "react";
import CartModal from "./cart/Modal";

const { SITE_NAME } = process.env;

export const navbarItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
];

export function Navbar() {
  return (
    <nav className="bg-neutral-50 flex items-center justify-between p-4 lg:px-6 sticky top-0 z-10">
      <div className="block flex-none md:hidden"></div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {navbarItems.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  prefetch
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CartModal />
    </nav>
  );
}
