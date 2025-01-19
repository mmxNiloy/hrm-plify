"use server";

import { withError } from "@/utils/Debug";

export async function getCompanyCount() {
  const req = fetch(`${process.env.API_BASE_URL}/companies/count`, {
    method: "GET",
  });

  const { data, error } = await withError<{ ans: number }>(req);
  if (error) {
    console.error(
      "Actions > Get sample companies > Failed to get sample companies",
      error
    );
    return { error };
  }

  return { data };
}
