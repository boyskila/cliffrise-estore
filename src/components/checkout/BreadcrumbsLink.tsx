"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  href: string;
  children: string;
};

export const BreadcrumbLink = ({ children, href }: Props) => {
  const pathname = usePathname();
  const isEnabled =
    (pathname === "/checkout/shipping" && href === "/checkout/information") ||
    (pathname === "/checkout/payment" && href !== "/checkout/payment");

  if (isEnabled) {
    return (
      <Link
        href={href}
        className="ms-1 text-sm font-medium text-blue-500 md:ms-2 dark:text-gray-400"
      >
        {children}
      </Link>
    );
  }
  return (
    <span className="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400">
      {children}
    </span>
  );
};
