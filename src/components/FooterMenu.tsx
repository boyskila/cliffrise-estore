"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navbarItems } from "./Navbar";

export function FooterMenuItem({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === href);

  useEffect(() => {
    setActive(pathname === href);
  }, [pathname, href]);

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300",
          { "text-black dark:text-neutral-300": active }
        )}
      >
        {title}
      </Link>
    </li>
  );
}

export default function FooterMenu() {
  return (
    <nav>
      <ul>
        {navbarItems.map((item) => {
          return <FooterMenuItem key={item.title} {...item} />;
        })}
      </ul>
    </nav>
  );
}
