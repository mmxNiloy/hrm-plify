"use server";

import { withTextDataError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getFile(url: string) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const devUrl = url.replace(
    /http[s]{0,1}:\/\/backend:50{3}/,
    process.env.API_BASE_URL?.replace("api", "") ??
      "https://www.revolohr.com/backend"
  );

  const prodUrl = url.replace("https", "http");
  const mUrl =
    process.env.NODE_ENV === "development"
      ? devUrl
      : process.env.NODE_ENV === "production"
      ? prodUrl
      : url;
  console.log("Trying to get file from url:", mUrl);

  const req = fetch(mUrl, {
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
