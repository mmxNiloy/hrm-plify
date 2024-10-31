"use server";

import { IHoliday } from "@/schema/HolidaySchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getHolidays({ company_id }: { company_id: number }) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-holiday-list/${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<{
    message: string;
    data: IHoliday[];
  }>(req);

  if (error) {
    console.error(
      "Actions > Get holiday list > Failed to get holiday list >",
      error
    );
    return { error };
  }

  return { data: data.data };
}
