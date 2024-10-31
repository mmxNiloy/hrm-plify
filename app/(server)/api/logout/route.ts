import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  (await cookies()).delete(process.env.COOKIE_SESSION_KEY!);
  (await cookies()).delete(process.env.COOKIE_USER_KEY!);
  (await cookies()).delete(process.env.COOKIE_EMPLOYEE_KEY!);

  return NextResponse.redirect(new URL("/", req.url));
}

export async function GET(req: NextRequest) {
  (await cookies()).delete(process.env.COOKIE_SESSION_KEY!);
  (await cookies()).delete(process.env.COOKIE_USER_KEY!);
  (await cookies()).delete(process.env.COOKIE_EMPLOYEE_KEY!);

  return NextResponse.redirect(new URL("/", req.url));
}
