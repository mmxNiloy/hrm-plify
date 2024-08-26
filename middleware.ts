import { checkRole } from "@/middlewares/checkRole";
import { validateSession } from "@/middlewares/validateSession";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard") && !validateSession(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // For company route, check role and redirect accordingly
  if (req.nextUrl.pathname.startsWith("/dashboard/company")) {
    const userRole = checkRole(req);

    if (!userRole) {
      return NextResponse.redirect(new URL(`/`, req.url));
    } else if (
      userRole.role.role_name !== "Super Admin" &&
      userRole.role.role_name !== "Admin"
    ) {
      return NextResponse.redirect(
        new URL(`/dashboard/company/${userRole.company_id}`, req.url)
      );
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard/company/:path*"],
};
