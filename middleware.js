import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function middleware(request) {
  const token = request.cookies.get('auth_token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && request.nextUrl.pathname === '/login') {
    try {
      await jwtVerify(token.value, secretKey)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch {
      // Token is invalid, allow access to login
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}