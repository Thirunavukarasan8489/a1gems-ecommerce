import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    const isAuthRoute = 
      pathname === '/admin/login' || 
      pathname === '/admin/forgot-password' || 
      pathname.startsWith('/admin/reset-password');

    const isProtectedRoute = pathname.startsWith('/admin') && !isAuthRoute;

    // Protection logic for /admin routes
    if (isProtectedRoute) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      // Check for valid admin roles
      const validAdminRoles = ['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER'];
      if (!validAdminRoles.includes(token.role as string)) {
        // Redirect unauthorized users (e.g. CUSTOMER) to the public homepage or unauthorized page
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Strict protection for System / Settings routes
      if (pathname.startsWith('/admin/system') || pathname.startsWith('/admin/settings')) {
        if (token.role !== 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url));
        }
      }
    }
    
    // Redirect authenticated admins away from auth pages to dashboard
    if (isAuthRoute && token) {
      const validAdminRoles = ['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER'];
      if (validAdminRoles.includes(token.role as string)) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        // returning true allows the middleware function above to run unconditionally
        // so we can handle the redirect logic ourselves.
        return true; 
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
