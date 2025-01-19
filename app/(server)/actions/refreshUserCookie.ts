"use server";

import { ILoginResponse } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "./logout";
import { withError } from "@/utils/Debug";

export default async function refreshUserCookie() {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/profile/role-data`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    method: "GET",
  });

  const { data, error } = await withError<ILoginResponse>(req);
  if (error) {
    console.error(
      "Actions > Refresh User Cookie > Failed to refresh user cookie",
      error
    );
    await logout();
    throw error;
  }

  // Send a cookie w\ user data
  (await cookies()).set(
    process.env.COOKIE_USER_KEY!,
    JSON.stringify(data.user),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: Date.now() + 43200000, // 12hrs
    }
  );
  redirect("/dashboard");
}
