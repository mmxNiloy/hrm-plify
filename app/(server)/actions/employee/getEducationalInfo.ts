"use server";

import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getEducationalInfo(employeeId: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/employee/get-education-data/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<{
    message: string;
    data: IEmployeeEducationalDetail[];
  }>(req);

  if (error) {
    console.error(
      "Actions > Employee > Get Educational Info > Failed to get educational info >",
      error
    );

    return { error };
  }

  return { data: data.data };
}
