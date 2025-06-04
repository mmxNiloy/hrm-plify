"use server";

import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";

export default async function getCurrentUser() {
  const mCookies = await cookies();

  try {
    const user = JSON.parse(
      mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
    ) as IUser;
    return user;
  } catch (err) {
    console.error("[Actions > Get current user] Failed to parse user cookie.");
    return null;
  }
}
