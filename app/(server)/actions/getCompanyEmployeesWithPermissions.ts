"use server";

import { ICompanyEmployeeWithPermissions } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyEmployeesWithPermissions(companyId: number) {
  const sessionId = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  const req = fetch(
    `${process.env.API_BASE_URL}/companies/my/get-employee-with-permissions/${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionId?.value}`,
      },
    }
  );

  const { data, error } = await withError<ICompanyEmployeeWithPermissions>(req);
  if (error) {
    console.error(
      "Actions > Get Company Employees > Failed to get company employees >",
      error
    );
    return { error };
  }

  return { data };
}
