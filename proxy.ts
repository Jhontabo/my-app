import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/admin/login"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const sessionCookie = req.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  // Handle public routes first (e.g. /admin/login)
  if (isPublicRoute) {
    if (session?.email) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute && !session?.email) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
