"use server";
import { ICompany } from "@/schema/CompanySchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyData(company_id: number) {
  // Get company information
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/companies/${company_id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  const { data, error } = await withError<ICompany>(req);
  if (error) {
    console.error(
      "Actions > Get Company Data > Failed to fetch company information",
      error
    );
    return { error };
  }

  return { data };
}
