"use server";

import { IHolidayType } from "@/schema/HolidaySchema";
import { cookies } from "next/headers";

export async function getHolidayTypes({ company_id }: { company_id: number }) {
  const fallback: IHolidayType[] = [];

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-holiday-types/${company_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      const result = (await apiRes.json()) as {
        message: string;
        data: IHolidayType[];
      };
      return result.data;
    } else {
      console.error(
        "Actions > Get holiday types > Failed to get holiday types >",
        { error: await apiRes.json(), status: apiRes.status }
      );
    }
  } catch (err) {
    console.error(
      "Actions > Get holiday types > Failed to get holiday types >",
      err
    );
  }

  return fallback;
}
