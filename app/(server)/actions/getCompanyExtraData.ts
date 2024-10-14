"use server";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { cookies } from "next/headers";

export async function getCompanyExtraData(company_id: number) {
  const fallback: ICompanyExtraData = {
    shifts: [],
    designations: [],
    departments: [],
    employees: [],
  };

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/rota/data-company-wise/${company_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
        method: "GET",
      }
    );

    if (apiRes.ok) {
      const result = (await apiRes.json()) as ICompanyExtraData;
      return result;
    }

    console.error("Get company shifts > Failed to get company shifts", {
      status: apiRes.status,
    });

    return fallback;
  } catch (err) {
    console.error("Get Company Shifts > Failed to get shifts >", err);
    return fallback;
  }
}
