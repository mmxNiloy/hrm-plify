"use server";

import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getEmergencyContactInfo(employeeId: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/employee/get-next-kin-data/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IEmployeeEmergencyContact>(req);
  if (error) {
    console.error(
      "Actions > Employee > Get Emergency Contact Info > Failed to get emergency contact info >",
      error
    );
    return { error };
  }

  return { data };
}
