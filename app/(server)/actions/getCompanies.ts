"use server";

import { IPaginatedCompany } from "@/schema/CompanySchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanies({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/companies?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<IPaginatedCompany>(req);
  if (error) {
    console.error("Actions > Get Companies > Failed to get companies", error);
    return { error };
  }
  return { data };
}
