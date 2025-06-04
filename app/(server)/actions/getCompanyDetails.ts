"use server";

import { ICompanyDetails } from "@/schema/CompanySchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getCompanyDetails(company_id: string) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/my-company/details/${company_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<ICompanyDetails>(req);
  if (error) {
    console.error(
      "Actions > Get company details > Failed to fetch company information",
      error
    );

    return { error };
  }
  return { data };
}
