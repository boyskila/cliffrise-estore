import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname; // Extract the pathname
  const response = NextResponse.next();
  response.headers.set("x-current-path", currentPath); // Add custom header
  return response;
}
