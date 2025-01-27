"use server";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { IPaginatedJobListing } from "@/schema/JobSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyJobListings({
  company_id,
  page,
  limit,
}: {
  company_id: number;
  page: number;
  limit: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/recruitment/company/${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );
  const { data, error } = await withError<IPaginatedJobListing>(req);
  if (error) {
    console.error(
      "Actions > Get Company Job Listings > Failed to get company job listings >",
      error
    );
    return { error };
  }
  return { data };
}
