"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().delete(process.env.COOKIE_SESSION_KEY!);
  cookies().delete(process.env.COOKIE_USER_KEY!);
  cookies().delete(process.env.COOKIE_EMPLOYEE_KEY!);

  redirect("/?_ref=logout");
}
