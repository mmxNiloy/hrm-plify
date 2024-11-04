"use server";

import { IPaginatedCompanyUser } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyEmployees({
  companyId,
  page,
  limit,
  showMigrantEmployeesOnly,
}: {
  companyId: number;
  page: number;
  limit: number;
  showMigrantEmployeesOnly?: boolean;
}) {
  const sessionId = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  const req = fetch(
    `${
      process.env.API_BASE_URL
    }/companies/my/get-employee/${companyId}?page=${page}&limit=${limit}&show_migrants=${
      showMigrantEmployeesOnly ? "true" : "false"
    }`,
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
