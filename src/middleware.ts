import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);

  let response = NextResponse.next({
    request: {
      headers,
    },
  });

  if (pathname.startsWith("/menu")) {
    if (!searchParams.has("group")) {
      const currentHour = new Date().getHours();
      const group = currentHour < 18 ? "lunch" : "dinner";

      response = NextResponse.redirect(
        new URL(`/menu?group=${group}`, request.url),
        { headers },
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|fonts|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
