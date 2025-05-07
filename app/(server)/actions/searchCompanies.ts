"use server";

import { ICompany } from "@/schema/CompanySchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function searchCompanies({
  companyName,
  page,
  limit,
}: {
  companyName: string;
  page?: number;
  limit?: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/companies/search?name=${
      companyName.length < 3 ? "" : companyName
    }&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );

  const { data, error } = await withError<ICompany[]>(req);

  if (error) {
    console.error(
      "Actions > Search Companies by Name > Failed to get companies >",
      error
    );
    return { error };
  }

  return { data };
}
