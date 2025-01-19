"use server";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { ICompanyEmployeeStats } from "@/schema/StatsSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyEmployeeStats(company_id: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/stats/misc/${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );
  const { data, error } = await withError<ICompanyEmployeeStats>(req);
  if (error) {
    console.error(
      "Actions > Get Company Extra Data > Failed to get company extra data >",
      error
    );
    return { error };
  }
  return { data };
}
