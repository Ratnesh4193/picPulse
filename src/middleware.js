import { NextResponse } from "next/server";
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Configure to match all paths
export const config = {
  matcher: [
    "/",
    "/login",
    "/messages/:id*",
    "/post/:id*",
    "/profile/:id*",
    "/signup",
    "/chat/:id*",
  ],
};
