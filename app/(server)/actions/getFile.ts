"use server";

import { withTextDataError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getFile(url: string) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(url, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const { data, error } = await withTextDataError(req);
  if (error) {
    console.error("Actions > Get a file > Failed to get the file", error);

    return { error };
  }

  return { data };
}
