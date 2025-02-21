"use server";

import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";

export default async function getCurrentUser() {
  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return user;
}
