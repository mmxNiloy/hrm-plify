"use server";

import { withError } from "@/utils/Debug";

interface IRequestOTPProps {
  email: string;
}

export default async function requestOTP({ email }: IRequestOTPProps) {
  const req = fetch(`${process.env.API_BASE_URL}/request-recovery-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const { data, error } = await withError<{
    message: string;
    otp: string;
    email: string;
  }>(req);
  if (error) {
    console.error("Actions > Request OTP > Failed to get OTP >", error);
    return { error };
  }

  return { data };
}
