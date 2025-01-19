"use server";

import { IEmployeeNid } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getNIDInfo(employeeId: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/employee/get-nid-data/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<{
    message: string;
    data?: IEmployeeNid;
  }>(req);
  if (error) {
    console.error(
      "Actions > Employee > Get NID Info > Failed to get NID info >",
      error
    );
    return { error };
  }

  return { data: data.data };
}
