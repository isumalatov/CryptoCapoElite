import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/investments",
  "/referrals",
  "/settings",
  "/settings/account",
  "/settings/help",
  "/settings/notifications",
  "/not-found",
  "/admin",
  "/admin/helps",
  "/admin/notices",
  "/admin/presales",
  "/admin/users",
];
const publicRoutes = ["/signin", "/signup", "/reset-password"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Check if the user is an admin
  const isAdmin = session?.admin;

  // 5. Redirect to /signin if the user is not authenticated or if the user is trying to access an admin route but is not an admin
  if (
    (isProtectedRoute && !session?.userId) ||
    (path === "/admin" && !isAdmin)
  ) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
