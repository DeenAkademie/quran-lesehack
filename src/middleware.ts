import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Verbesserte Middleware mit Schutz gegen Endlosschleifen
export function middleware(request: NextRequest) {
  // Prüfe, ob die Anfrage bereits von der Middleware umgeleitet wurde
  const isRedirected =
    request.headers.get('x-middleware-rewrite') ||
    request.headers.get('x-middleware-next') ||
    request.headers.get('x-middleware-redirect');

  // Wenn die Anfrage bereits umgeleitet wurde, lasse sie durch
  if (isRedirected) {
    console.log('Request already redirected, passing through');
    return NextResponse.next();
  }

  // Prüfe auf das Auth-Cookie
  const authCookie = request.cookies.get('auth')?.value;

  // Definiere geschützte Routen
  const protectedRoutes = ['/', '/lektionen', '/videos', '/quizzes', '/profil'];
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(route + '/')
  );

  // Wenn der Benutzer nicht angemeldet ist und eine geschützte Route aufruft
  if (!authCookie && isProtectedRoute) {
    console.log(
      'Unauthenticated access to protected route, redirecting to login'
    );
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }

  // Wenn der Benutzer angemeldet ist und die Login-Seite aufruft
  if (
    authCookie &&
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/forgot-password')
  ) {
    console.log('Authenticated user accessing login page, redirecting to home');
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }

  return NextResponse.next();
}

// Konfiguriere die Middleware für alle Pfade außer statischen Dateien
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - debug (debug page)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|debug).*)',
  ],
};
