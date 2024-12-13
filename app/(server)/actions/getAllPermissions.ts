"use server";

import { IPermission } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getAllPermissions() {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/profile/get-all-permission`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const { data, error } = await withError<IPermission[]>(req);

  if (error) {
    console.error(
      "Actions > Get All Subadmins > Failed to get all subadmins",
      error
    );

    return { error };
  }

  return { data };
}
