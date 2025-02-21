"use server";

import { ICompany } from "@/schema/CompanySchema";
import { withError } from "@/utils/Debug";

export async function getFeaturedCompanies() {
  const req = fetch(`${process.env.API_BASE_URL}/companies/showcase`, {
    method: "GET",
  });

  const { data, error } = await withError<ICompany[]>(req);
  if (error) {
    console.error(
      "Actions > Get sample companies > Failed to get sample companies",
      error
    );
    return { error };
  }

  return { data };
}
