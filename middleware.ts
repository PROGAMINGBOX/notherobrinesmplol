import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect authenticated users away from auth pages
    if (token && (pathname === "/signin" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // Allow access to auth pages without token
        if (pathname === "/signin" || pathname === "/signup") {
          return true;
        }

        // Require token for protected routes
        return !!token;
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/signin", "/signup"],
};
