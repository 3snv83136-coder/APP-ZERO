import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isLoginPage = req.nextUrl.pathname === '/login'
  const isApi = req.nextUrl.pathname.startsWith('/api/')
  const isStatic = req.nextUrl.pathname.startsWith('/_next/') || req.nextUrl.pathname.startsWith('/favicon.ico')

  // Routes publiques : login, API, assets statiques
  if (isLoginPage || isApi || isStatic) {
    return NextResponse.next()
  }

  // Redirige vers /login si non authentifié
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)'],
}
