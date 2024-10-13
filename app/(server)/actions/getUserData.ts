"use server";

import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";

export async function getUserData() {
  var user: IUser | undefined;
  try {
    user = JSON.parse(
      cookies().get(process.env.COOKIE_USER_KEY!)?.value!
    ) as IUser;
  } catch (err) {
    console.error("DashboardNavbar > User Cookie not found", err);
    user = undefined;
  }

  return user;
}
