import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/context/Cart";
import Footer from "@/components/Footer";
import classNames from "classnames";
import { ProductProvider } from "@/context/Product";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CliffRise",
  description: "Generated by create next app",
};

const cn = classNames({
  "bg-neutral-50": true,
  "text-black": true,
  "selection:bg-teal-300": true,
  "dark:bg-neutral-900": true,
  "dark:text-white": true,
  "dark:selection:bg-pink-500": true,
  "dark:selection:text-white": true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={cn}>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
