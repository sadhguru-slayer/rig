import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { parse } from "cookie";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader || "");
  const token = cookies.core_token;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthApi = pathname.startsWith("/api/admin");

  // ✅ FIX: await here
  const payload = token ? await verifyToken(token) : null;

  // 1. Block non-authenticated users
  if ((isAdminRoute || isAuthApi) && pathname !== "/admin/login") {
    if (!payload) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Block authenticated users from visiting login page
  if (pathname === "/admin/login" && payload) {
    const dashboardUrl = new URL("/admin/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Restrict /admin/user routes only to superusers
if (pathname.startsWith("/admin/user")) {
  if (!payload?.isSuperUser) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
}


  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
