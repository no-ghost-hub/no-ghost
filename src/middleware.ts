import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOdoo from "@/utils/getOdoo";

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
      const menuGroups: any[] = await getOdoo("menu-groups");
      console.log(menuGroups);

      const currentHour = new Date().getHours();
      const group = menuGroups.find(
        ({ hourFrom, hourTo }) =>
          currentHour >= parseInt(hourFrom) && currentHour < parseInt(hourTo),
      );

      if (group?.url) {
        response = NextResponse.redirect(new URL(group.url, request.url), {
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
