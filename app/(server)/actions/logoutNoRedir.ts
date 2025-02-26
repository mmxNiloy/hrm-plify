"use server";

import { cookies } from "next/headers";

export async function logoutNoRedir() {
  const mCookies = await cookies();
  mCookies.delete(process.env.COOKIE_SESSION_KEY!);
  mCookies.delete(process.env.COOKIE_USER_KEY!);
  mCookies.delete(process.env.COOKIE_EMPLOYEE_KEY!);
}
