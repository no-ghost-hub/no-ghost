import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import useOdoo from "@/utils/useOdoo";

export async function middleware(request: NextRequest) {
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
      const { data: menuGroups }: { data: any[] } = await useOdoo({
        route: "menu-groups",
      });

      const currentHour = new Date().getHours();
      const group = menuGroups.find(
        ({ hourFrom, hourTo }) =>
          currentHour >= parseInt(hourFrom) && currentHour < parseInt(hourTo),
      );

      if (group?.slug) {
        const url = new URL(request.url);
        url.searchParams.set("group", group.slug);

        response = NextResponse.redirect(url, {
          headers,
        });
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|fonts|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
