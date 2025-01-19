"use server";

import { IEmployeePassportDetail } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getPassportInfo(employeeId: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/employee/get-passport-data/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<IEmployeePassportDetail>(req);
  if (error) {
    console.error(
      "Actions > Employee > Get NID Info > Failed to get NID info >",
      error
    );
    return { error };
  }

  return { data };
}
