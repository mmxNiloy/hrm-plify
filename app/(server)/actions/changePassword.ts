"use server";

import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface IChangePasswordProps {
  new_password: string;
  old_password: string;
}

export default async function changePassword({
  new_password,
  old_password,
}: IChangePasswordProps) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(`${process.env.API_BASE_URL}/change-password`, {
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ new_password, old_password }),
  });

  const { data, error } = await withError<{
    message: string;
    otp: string;
    email: string;
  }>(req);
  if (error) {
    console.error(
      "Actions > Reset Password > Failed to reset password >",
      error
    );
    return { error };
  }

  return { data };
}
