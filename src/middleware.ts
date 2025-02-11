import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname; // Extract the pathname
  const response = NextResponse.next();
  response.headers.set("x-current-path", currentPath); // Add custom header

  const { pathname } = request.nextUrl;
  const checkoutStep = request.cookies.get("checkout_step")?.value;

  if (
    pathname.startsWith("/checkout/shipping") &&
    checkoutStep !== "information"
  ) {
    return NextResponse.redirect(new URL("/checkout/information", request.url));
  }

  if (pathname.startsWith("/checkout/payment") && checkoutStep !== "shipping") {
    return NextResponse.redirect(new URL("/checkout/shipping", request.url));
  }

  return response;
}
