import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Determine if this is an admin request (either via subdomain or direct path)
  const isAdminSubdomain = hostname.startsWith('admin.');
  
  // Exclude API routes and static files from rewrite/redirect logic
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Rewrite subdomain requests to /admin
  if (isAdminSubdomain && !url.pathname.startsWith('/admin')) {
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
    // We rewrite instead of redirect so the URL stays admin.domain.com
    return NextResponse.rewrite(url);
  }

  // Authentication check for any /admin path
  if (url.pathname.startsWith('/admin')) {
    // Exclude the login page itself to prevent infinite redirects
    if (url.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = req.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-shree-info-2026');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('Invalid token', error);
      const loginUrl = new URL('/admin/login', req.url);
      // Clear the invalid cookie
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
