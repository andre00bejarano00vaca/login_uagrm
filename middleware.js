import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // no proteger login ni rutas públicas
  if (pathname === '/login' || pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  const jwt = request.cookies.get("auth")?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', "/"]// rutas protegidas
};
