// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("🧠 Middleware Check:", { pathname, token: !!token, role });

  // ✅ ROUTE YANG BOLEH DIAKSES TANPA LOGIN
  const publicRoutes = ["/", "/login", "/register"];

  // ✅ ROUTE YANG DIKELUARKAN DARI PEMERIKSAAN
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // 🧩 1. GUEST (belum login)
  if (!token) {
    // Jika belum login DAN bukan route publik → redirect ke login
    if (!publicRoutes.includes(pathname)) {
      console.log("🚫 Belum login, redirect ke /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Jika route publik, lanjut
    return NextResponse.next();
  }

  // 🧩 2. SUDAH LOGIN tapi ke halaman login/register
  if (
    token &&
    (pathname === "/login" || pathname === "/register" || pathname === "/")
  ) {
    console.log("🔁 Sudah login, redirect sesuai role");
    const redirectMap: Record<string, string> = {
      admin: "/admin/dashboard",
      cashier: "/kasir/dashboard",
      kasir: "/kasir/dashboard",
      customer: "/customer/dashboard",
      user: "/customer/dashboard",
    };

    const redirectPath = redirectMap[role || ""] || "/login";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 🧩 3. CEK ROLE & BATASI AKSES
  if (token && role) {
    const roleAccess: Record<string, string[]> = {
      admin: ["/admin"],
      cashier: ["/kasir"],
      kasir: ["/kasir"],
      customer: ["/customer"],
      user: ["/customer"],
    };

    const allowedPaths = roleAccess[role] || [];
    const hasAccess = allowedPaths.some((path) => pathname.startsWith(path));

    if (!hasAccess) {
      console.log("🚫 Role tidak cocok, redirect ke dashboard");
      const redirectMap: Record<string, string> = {
        admin: "/admin/dashboard",
        cashier: "/kasir/dashboard",
        kasir: "/kasir/dashboard",
        customer: "/customer/dashboard",
        user: "/customer/dashboard",
      };
      const redirectPath = redirectMap[role] || "/login";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Matcher (gunakan pola yang tepat)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api).*)"],
};
