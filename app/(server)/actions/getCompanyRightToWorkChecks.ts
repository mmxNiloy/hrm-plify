"use server";

import { IPaginatedEmployeeDocument } from "@/schema/EmployeeSchema";
import { IPaginatedRTW } from "@/schema/RightToWork";
import { IPaginatedCompanyUser } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyRightToWorkChecks({
  companyId,
  page,
  limit,
  experimental,
}: {
  companyId: number;
  page: number;
  limit: number;
  experimental?: boolean;
}) {
  if (experimental) {
    const data: IPaginatedRTW = {
      total_page: 1,
      data_count: 0,
      data: [],
    };

    return { data };
  }
  const sessionId = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/right-to-work?company_id=${companyId}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${sessionId?.value}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedRTW>(req);
  if (error) {
    console.error(
      "Actions > Get Company Employee Right To Work Checks > Failed to get company employee right to work checks >",
      error
    );
    return { error };
  }

  return { data };
}
