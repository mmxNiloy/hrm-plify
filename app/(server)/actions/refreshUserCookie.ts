"use server";

import { ILoginResponse } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "./logout";

export default async function refreshUserCookie() {
  var endpoint = "";
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/profile/role-data`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
        method: "GET",
      }
    );

    if (apiRes.ok) {
      const data = (await apiRes.json()) as ILoginResponse; /// Caution: Does not actually send a new token
      console.log("Action > Refresh User Cookie > Got new data", data);

      // Send a cookie w\ user data
      cookies().set(process.env.COOKIE_USER_KEY!, JSON.stringify(data.user), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: Date.now() + 43200000, // 12hrs
      });

      // Redirect to dashboard, the middleware handles the rest
      endpoint = "/dashboard";
    } else {
      // On error log the user out and start again
      console.error(
        "Actions > Refresh User Cookie > Failed to refresh user cookie",
        { error: await apiRes.json(), status: apiRes.status }
      );
    }
  } catch (err) {
    console.error(
      "Actions > Refresh User Cookie > Failed to refresh user cookie",
      err
    );
  }

  if (endpoint !== "/dashboard") await logout();
  redirect(endpoint);
}
