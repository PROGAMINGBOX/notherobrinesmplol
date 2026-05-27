import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "dev-secret-change-me"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch {}
  }

  if (pathname === "/signin" || pathname === "/signup") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/signin", "/signup"],
};
