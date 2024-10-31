"use server";

import { IEmployeeVisaBrp } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getVisaBRPInfo(employeeId: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/employee/get-visa-brp-data/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<{
    message: string;
    data?: IEmployeeVisaBrp;
  }>(req);
  if (error) {
    console.error(
      "Actions > Employee > Get Visa/BRP Info > Failed to get Visa/BRP info >",
      error
    );
    return { error };
  }

  return { data: data.data };
}
