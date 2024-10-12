"use server";

import { IHoliday } from "@/schema/HolidaySchema";
import { cookies } from "next/headers";

export async function getHolidays({ company_id }: { company_id: number }) {
  const fallback: IHoliday[] = [];

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-holiday-list/${company_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      const result = (await apiRes.json()) as {
        message: string;
        data: IHoliday[];
      };
      return result.data;
    } else {
      console.error(
        "Actions > Get holiday list > Failed to get holiday list >",
        { error: await apiRes.json(), status: apiRes.status }
      );
    }
  } catch (err) {
    console.error(
      "Actions > Get holiday list > Failed to get holiday list >",
      err
    );
  }

  return fallback;
}
