"use server";

import { IUser } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getAllSubadmins() {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/profile/get-all-users`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const { data, error } = await withError<IUser[]>(req);

  if (error) {
    console.error(
      "Actions > Get All Subadmins > Failed to get all subadmins",
      error
    );

    return { error };
  }

  return { data };
}
