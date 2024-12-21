"use server";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { IPaginatedStaffReport } from "@/schema/StaffReportSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyStaffReportPaginated({
  companyId,
  page,
  limit,
}: {
  companyId: number;
  page: number;
  limit: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/employee/report/paginated/${companyId}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );
  const { data, error } = await withError<IPaginatedStaffReport>(req);
  if (error) {
    console.error(
      "Actions > Get Company Staff Report (Paginated) > Failed to get company staff report (paginated) >",
      error
    );
    return { error };
  }
  return { data };
}
