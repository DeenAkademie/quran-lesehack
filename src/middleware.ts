import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Improved middleware implementation to handle authentication
export function middleware(request: NextRequest) {
  // Check for Supabase auth cookies (any of these indicate a logged-in state)
  const sbAccessToken = request.cookies.get('sb-access-token')?.value;
  const sbAuthToken = request.cookies.get('sb-auth-token')?.value;
  const supabaseAuth = request.cookies.get('supabase-auth-token')?.value;
  const authCookie = request.cookies.get('auth')?.value;

  // User is logged in if any of the auth cookies exist
  const isLoggedIn = !!(
    sbAccessToken ||
    sbAuthToken ||
    supabaseAuth ||
    authCookie
  );

  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = [
    '/',
    '/lektionen',
    '/videos',
    '/quizzes',
    '/profil',
    '/fortschritt',
    '/highscores',
  ];

  // Check if current path is protected
  let isProtected = false;
  for (const route of protectedRoutes) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      isProtected = true;
      break;
    }
  }

  // If user is not logged in and tries to access a protected route
  if (!isLoggedIn && isProtected) {
    console.log('Redirecting to login: User not authenticated for', pathname);
    // Create a modified URL for redirection
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Add return_to parameter to redirect back after login
    url.searchParams.set('return_to', pathname);
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access login page
  if (
    isLoggedIn &&
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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|hasanat-counter.png|public|debug|api).*)',
  ],
};
