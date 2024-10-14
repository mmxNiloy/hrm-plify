"use server";

import { ICompanyDetails } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getCompanyDetails(company_id: number) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  try {
    const companyRes = await fetch(
      `${process.env.API_BASE_URL}/my-company/details/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!companyRes.ok) {
      notFound();
    }

    return (await companyRes.json()) as ICompanyDetails;
  } catch (err) {
    console.error(
      "Actions > Get company details > Failed to fetch company information",
      err
    );
    notFound();
  }
}
