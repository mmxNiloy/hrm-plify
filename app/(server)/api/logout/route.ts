import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  cookies().delete(process.env.COOKIE_SESSION_KEY!);
  cookies().delete(process.env.COOKIE_USER_KEY!);
  cookies().delete(process.env.COOKIE_EMPLOYEE_KEY!);

  return NextResponse.redirect(new URL("/", req.url));
}

export async function GET(req: NextRequest) {
  cookies().delete(process.env.COOKIE_SESSION_KEY!);
  cookies().delete(process.env.COOKIE_USER_KEY!);
  cookies().delete(process.env.COOKIE_EMPLOYEE_KEY!);

  return NextResponse.redirect(new URL("/", req.url));
}
