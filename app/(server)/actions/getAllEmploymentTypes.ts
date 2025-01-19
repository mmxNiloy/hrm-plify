"use server";

import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export default async function getAllEmploymentTypes() {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-employment-types`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<{
    data: IEmploymentType[];
  }>(req);
  if (error) {
    console.error(
      "Actions > Get All Attendance Reports > Failed to get all attendance reports",
      error
    );

    return { error };
  }

  return { ...data };
}
