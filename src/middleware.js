import { NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

// Paths that require authentication
const protectedPaths = ['/admin'];
// Paths that should not be accessed if already authenticated
const authPaths = ['/admin/login'];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Only protect /admin routes
  if (!path.startsWith('/admin') && !path.startsWith('/api/data')) {
    return NextResponse.next();
  }

  // Public api routes
  if (path.startsWith('/api/auth/login')) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('session')?.value;
  let session = null;
  
  if (sessionCookie) {
    session = await decrypt(sessionCookie);
  }

  // Handle protected paths (must be logged in)
  const isProtectedPath = path.startsWith('/admin') && path !== '/admin/login';
  const isProtectedApi = path.startsWith('/api/data');

  if ((isProtectedPath || isProtectedApi) && !session) {
    if (isProtectedApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Handle auth paths (must NOT be logged in, e.g. login page)
  const isAuthPath = path === '/admin/login';
  if (isAuthPath && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/data/:path*'],
};
