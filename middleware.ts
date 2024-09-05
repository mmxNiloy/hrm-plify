import { checkRole } from "@/middlewares/checkRole";
import { validateSession } from "@/middlewares/validateSession";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = validateSession(req);
  const hasSession = typeof session === "string";

  // redirect unauthorized users
  if (req.nextUrl.pathname.startsWith("/dashboard") && !hasSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // redirect logged in users to the dashboard
  if (session && !req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // For company route, check role and redirect accordingly
  if (req.nextUrl.pathname.startsWith("/dashboard/company")) {
    const userRole = checkRole(req);

    if (!userRole) {
      return NextResponse.redirect(
        new URL("/dashboard?_ref=permission-denied", req.url)
      );
    } else if (
      userRole.role.role_name !== "Super Admin" &&
      userRole.role.role_name !== "Admin"
    ) {
      return NextResponse.rewrite(
        new URL(`/dashboard/company/${userRole.company_id}`, req.url)
      );
    }
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/dashboard/company/:path*"],
};
