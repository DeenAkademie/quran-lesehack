import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Bare minimum middleware implementation
export function middleware(request: NextRequest) {
  // Check for auth cookie
  const authCookie = request.cookies.get('auth')?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/', '/lektionen', '/videos', '/quizzes', '/profil'];

  // Check if current path is protected
  let isProtected = false;
  for (const route of protectedRoutes) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      isProtected = true;
      break;
    }
  }

  // If user is not logged in and tries to access a protected route
  if (!authCookie && isProtected) {
    // Create a modified URL for redirection
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access login page
  if (
    authCookie &&
    (pathname === '/login' || pathname === '/forgot-password')
  ) {
    // Create a modified URL for redirection
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure middleware for all paths except static files and API routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|debug|api).*)'],
};
