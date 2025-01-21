import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Import "./globals.css";
import { Navbar } from "./Navbar";
import { CartProvider } from "@/context/Cart";
import Footer from "./Footer";
import classNames from "classnames";
import { ProductProvider } from "@/context/product/ProductProvider";
import { PropsWithChildren, Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cn = classNames({
  "bg-neutral-50": true,
  "text-black": true,
  "selection:bg-teal-300": true,
  "dark:bg-neutral-900": true,
  "dark:text-white": true,
  "dark:selection:bg-pink-500": true,
  "dark:selection:text-white": true,
});

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${cn}`}>
      <CartProvider>
        <Navbar />
        {children}
        <Footer />
      </CartProvider>
    </div>
  );
};
