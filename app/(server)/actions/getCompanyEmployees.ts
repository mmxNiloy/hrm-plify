"use server";

import { IPaginatedCompanyUser } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyEmployees({
  companyId,
  page,
  limit,
  showMigrantEmployeesOnly,
  is_active = 1,
}: {
  companyId: number;
  page: number;
  limit: number;
  showMigrantEmployeesOnly?: boolean;
  is_active?: 0 | 1;
}) {
  const sessionId = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  const req = fetch(
    `${
      process.env.API_BASE_URL
    }/companies/my/get-employee/${companyId}?page=${page}&limit=${limit}&migrants_only=${
      showMigrantEmployeesOnly ? "1" : "0"
    }&is_active=${is_active}`,
    {
      headers: {
        Authorization: `Bearer ${sessionId?.value}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedCompanyUser>(req);
  if (error) {
    console.error(
      "Actions > Get Company Employees > Failed to get company employees >",
      error
    );
    return { error };
  }

  return { data };
}
