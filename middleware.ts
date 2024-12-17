import { checkRole } from "@/middlewares/checkRole";
import { validateSession } from "@/middlewares/validateSession";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = validateSession(req);
  const userRole = checkRole(req);
  const cks = await cookies();

  // console.log("Middleware > User Role", userRole);

  // redirect unauthorized users
  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // redirect logged in users to the dashboard
  if (session && !req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Default dashboard of each user
  if (req.nextUrl.pathname.endsWith("/dashboard")) {
    if (!userRole) {
      cks.delete(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY!);
      cks.delete(process.env.NEXT_PUBLIC_COOKIE_USER_KEY!);
      return NextResponse.redirect(
        new URL("/?_ref=permission-denied", req.url)
      );
    } else if (userRole.role.role_name === "Guest") {
      return NextResponse.rewrite(
        new URL("/dashboard/profile?_ref=guest", req.url)
      );
    } else if (userRole.role.role_name === "Employee") {
      return NextResponse.redirect(
        new URL(
          `/dashboard/company/${userRole.company_id}/employee/home`,
          req.url
        )
      );
    } else if (userRole.role.role_name === "Company Admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/company/${userRole.company_id}/`, req.url)
      );
    }
  }

  // Route guards
  if (
    userRole?.role.role_name === "Company Admin" &&
    !req.nextUrl.pathname.startsWith(
      `/dashboard/company/${userRole.company_id}`
    )
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/company/${userRole.company_id}`, req.url)
    );
  }

  if (
    userRole?.role.role_name === "Employee" &&
    (!req.nextUrl.pathname.startsWith(
      `/dashboard/company/${userRole.company_id}/employee`
    ) ||
      req.nextUrl.pathname ===
        `/dashboard/company/${userRole.company_id}/employee`)
  ) {
    return NextResponse.redirect(
      new URL(
        `/dashboard/company/${userRole.company_id}/employee/home`,
        req.url
      )
    );
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/dashboard/company/:path*"],
};
