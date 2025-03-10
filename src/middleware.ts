import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if user is authenticated by looking for the user item in localStorage
  // Since we can't access localStorage directly in middleware, we'll use a cookie
  const authCookie = request.cookies.get('auth')?.value;

  // Define protected routes that require authentication
  const protectedRoutes = ['/lektionen', '/videos', '/quizzes', '/profil'];
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(route + '/')
  );

  // If the user is not logged in and trying to access a protected route
  if (!authCookie && isProtectedRoute) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is logged in and trying to access login page
  if (
    authCookie &&
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/forgot-password')
  ) {
    // Redirect to the home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
