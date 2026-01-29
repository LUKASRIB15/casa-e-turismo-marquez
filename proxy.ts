import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/inicio", "/imoveis", "/contato", "/admin"];

const PRIVATE_ROUTES = ["/edit/inicio", "/edit/imoveis"];

const AUTH_REDIRECT = "/edit/inicio";
const UNAUTH_REDIRECT = "/inicio";
const NOT_FOUND_REDIRECT = "/inicio";

/**
 * Verifica se pathname bate ou começa com alguma rota
 */
function startsWithRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

/**
 * Verifica se a rota existe no sistema
 */
function routeExists(pathname: string) {
  return (
    startsWithRoute(pathname, PUBLIC_ROUTES) ||
    startsWithRoute(pathname, PRIVATE_ROUTES)
  );
}

/**
 * Decodifica JWT e verifica expiração (Edge-safe)
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;

    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    );

    if (!decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPublic = startsWithRoute(pathname, PUBLIC_ROUTES);
  const isPrivate = startsWithRoute(pathname, PRIVATE_ROUTES);

  // 🚫 ROTA NÃO EXISTE
  if (!routeExists(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = NOT_FOUND_REDIRECT;
    return NextResponse.redirect(url);
  }

  // 🔓 NÃO autenticado
  if (!token) {
    if (isPrivate) {
      const url = request.nextUrl.clone();
      url.pathname = UNAUTH_REDIRECT;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // 🔐 Autenticado → verifica expiração
  if (isTokenExpired(token)) {
    const response = NextResponse.redirect(
      new URL(UNAUTH_REDIRECT, request.url)
    );
    response.cookies.delete("access_token");
    return response;
  }

  // 🔐 Token válido
  if (isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = AUTH_REDIRECT;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)).*)",
  ],
};
