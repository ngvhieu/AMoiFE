import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_PREFIXES = ['/feed', '/profile', '/library', '/settings'];

// Auth routes — redirect to home if already logged in
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];

const TOKEN_COOKIE = 'hiu_access_token';

function isProtected(pathname: string): boolean {
  // Exact root or anything under a protected prefix
  return PROTECTED_PREFIXES.some((prefix) =>
    prefix === '/' ? pathname === '/' : pathname.startsWith(prefix)
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  // Logged-in user visiting auth pages → redirect to home
  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Unauthenticated user visiting protected pages → redirect to login
  if (isProtected(pathname) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (Next.js build assets)
     * - _next/image   (Next.js image optimisation)
     * - favicon.ico
     * - Public files  (images, fonts …)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)).*)',
  ],
};
