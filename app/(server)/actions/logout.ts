"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const mCookies = await cookies();
  mCookies.delete(process.env.COOKIE_SESSION_KEY!);
  mCookies.delete(process.env.COOKIE_USER_KEY!);
  mCookies.delete(process.env.COOKIE_EMPLOYEE_KEY!);

  redirect("/?_ref=logout");
}
