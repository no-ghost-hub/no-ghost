import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import useOdoo from "@/utils/useOdoo";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  const { pathname, searchParams } = request.nextUrl;

  let response = NextResponse.next({
    request,
  });

  if (hostname?.startsWith("order.")) {
    const url = new URL(`/order`, request.url);
    url.search = searchParams.toString();
    response = NextResponse.rewrite(url);
  } else if (
    pathname.startsWith("/order") &&
    process.env.NODE_ENV === "production"
  ) {
    response = NextResponse.redirect(new URL("/", request.url));
  }

  // if (pathname.startsWith("/menu")) {
  //   if (!searchParams.has("group")) {
  //     const { data: menuGroups }: { data: any[] } = await useOdoo({
  //       route: "menu-groups",
  //     });

  //     const currentHour = new Date().getHours();
  //     const group = menuGroups.find(
  //       ({ hourFrom, hourTo }) =>
  //         currentHour >= parseInt(hourFrom) && currentHour < parseInt(hourTo),
  //     );

  //     if (group?.slug) {
  //       const url = new URL(request.url);
  //       url.searchParams.set("group", group.slug);

  //       response = NextResponse.redirect(url);
  //     }
  //   }
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|fonts|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
