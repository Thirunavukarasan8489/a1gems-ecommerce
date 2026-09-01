import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  });

  const isAuthRoute =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname.startsWith("/admin/reset-password");

  const isProtectedRoute = pathname.startsWith("/admin") && !isAuthRoute;

  const isPublicAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password");



  // Protection logic for /admin routes
  if (isProtectedRoute) {
    if (!token) {
      if (
        req.headers.get("next-action") ||
        req.headers.get("x-action") ||
        pathname.startsWith("/api/")
      ) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const validAdminRoles = ["SUPER_ADMIN", "CONTENT_MANAGER", "LEAD_MANAGER"];
    if (!validAdminRoles.includes(token.role as string)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      pathname.startsWith("/admin/system") ||
      pathname.startsWith("/admin/settings")
    ) {
      if (token.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  }

  const isPublicProtectedRoute = pathname.startsWith("/account") || pathname.startsWith("/checkout");

  // Protection logic for /account routes
  if (isPublicProtectedRoute) {
    if (!token || token.role !== "CUSTOMER") {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
    }
  }

  // Redirect authenticated admins away from auth pages to dashboard
  if (isAuthRoute && token) {
    const validAdminRoles = ["SUPER_ADMIN", "CONTENT_MANAGER", "LEAD_MANAGER"];
    if (validAdminRoles.includes(token.role as string)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Handle public auth routes for logged in users
  if (isPublicAuthRoute && token) {
    if (token.role === "CUSTOMER") {
      // Customers go to their portal
      return NextResponse.redirect(new URL("/account/dashboard", req.url));
    } else {
      // Admins shouldn't be at /login, send them to their dashboard
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*", "/checkout", "/login", "/register", "/forgot-password", "/reset-password"],
};
