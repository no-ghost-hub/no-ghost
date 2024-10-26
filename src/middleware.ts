import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  if (!searchParams.has("group")) {
    const currentHour = new Date().getHours();
    const group = currentHour < 18 ? "Lunch" : "Dinner";

    return NextResponse.redirect(new URL(`/menu?group=${group}`, request.url));
  }
}

export const config = {
  matcher: ["/menu"],
};
