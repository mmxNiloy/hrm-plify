"use server";

import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";

export default async function getCurrentUserPermissions() {
  const mCookies = await cookies();

  try {
    const mPermissions = JSON.parse(
      mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ??
        "[]"
    ) as TPermission[];
    return mPermissions;
  } catch (err) {
    console.error(
      "[Actions > Get current user] Failed to parse user access cookie."
    );
    return null;
  }
}
