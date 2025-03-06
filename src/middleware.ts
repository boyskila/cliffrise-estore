import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname; // Extract the pathname
  const response = NextResponse.next();
  response.headers.set("x-current-path", currentPath); // Add custom header

  const { pathname } = request.nextUrl;
  const checkoutData = request.cookies.get("checkout_data")?.value;
  const checkoutSession = request.cookies.get("checkout_session")?.value;
  const isCheckoutSuccessful = request.cookies.get("success_checkout")?.value;
  const { steps } = checkoutData ? JSON.parse(checkoutData) : {};

  if (pathname.startsWith("/success") && !isCheckoutSuccessful) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/checkout/shipping") && !steps?.information) {
    return NextResponse.redirect(new URL("/checkout/information", request.url));
  }

  if (pathname.startsWith("/checkout/payment") && !steps?.shipping) {
    return NextResponse.redirect(new URL("/checkout/shipping", request.url));
  }

  // after successful payment the user lands on the success page
  // we want to be sure that hitting the back button won't redirect the user back to the info page
  if (pathname.startsWith("/checkout/information") && !checkoutSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
