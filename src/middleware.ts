import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/checkout') {
    const checkoutAccess = request.cookies.get('checkout-access');

    if (!checkoutAccess) {
      const url = request.nextUrl.clone();
      url.pathname = '/cart';
      url.searchParams.set('error', 'access-denied');
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next();
    response.cookies.delete('checkout-access');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/checkout',
};
