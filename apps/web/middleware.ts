import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAMES } from "@/constants/config.constants";

export function middleware(request: NextRequest) {
  // get token from cookies
  const token = request.cookies.get(COOKIE_NAMES.authToken)?.value;

  // check if the path is login page
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  // If no token and not on login page, redirect to /login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in and tries to access /login, redirect to home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// trigger the middleware base don this paths only
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
