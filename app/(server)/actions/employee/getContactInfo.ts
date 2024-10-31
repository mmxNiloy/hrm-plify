"use server";

import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getContactInfo(employeeId: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/employee/get-contact-info/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<{
    contact_information?: IEmployeeContactInfo;
  }>(req);

  if (error) {
    console.error(
      "Actions > Employee > Get Contact Info > Failed to get contact info >",
      error
    );
    return { error };
  }

  return { data: data.contact_information };
}
