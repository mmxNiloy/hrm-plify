"use server";

import { withError } from "@/utils/Debug";

interface IResetPasswordProps {
  token: string;
  password: string;
}

export default async function resetPassword({
  token,
  password,
}: IResetPasswordProps) {
  const req = fetch(`${process.env.API_BASE_URL}/reset-password`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ token, password }),
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
