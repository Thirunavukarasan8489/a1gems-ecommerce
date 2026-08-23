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

  // Protection logic for /admin routes
  if (isProtectedRoute) {
    if (!token) {
      // If it's a Server Action or API request, return 401 instead of redirecting
      if (
        req.headers.get("next-action") ||
        req.headers.get("x-action") ||
        pathname.startsWith("/api/")
      ) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Check for valid admin roles
    const validAdminRoles = ["SUPER_ADMIN", "CONTENT_MANAGER", "LEAD_MANAGER"];
    if (!validAdminRoles.includes(token.role as string)) {
      // Redirect unauthorized users (e.g. CUSTOMER) to the public homepage
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Strict protection for System / Settings routes
    if (
      pathname.startsWith("/admin/system") ||
      pathname.startsWith("/admin/settings")
    ) {
      if (token.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  }

  // Redirect authenticated admins away from auth pages to dashboard
  if (isAuthRoute && token) {
    const validAdminRoles = ["SUPER_ADMIN", "CONTENT_MANAGER", "LEAD_MANAGER"];
    if (validAdminRoles.includes(token.role as string)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/admin/:path*"],
};
