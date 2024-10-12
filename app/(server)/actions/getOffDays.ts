"use server";

import { IPaginatedOffDays } from "@/schema/RotaSchema";
import { cookies } from "next/headers";

export async function getOffDays({
  company_id,
  page,
  limit,
}: {
  company_id: number;
  page: number;
  limit: number;
}) {
  const fallback: IPaginatedOffDays = {
    message: "No data found",
    data: [],
    total_page: 1,
    data_count: 0,
  };

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/rota/day-off/${company_id}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
        method: "GET",
      }
    );

    if (apiRes.ok) {
      const result = (await apiRes.json()) as IPaginatedOffDays;
      return result;
    }

    console.error("Get company shifts > Failed to get company shifts", {
      status: apiRes.status,
    });

    return fallback;
  } catch (err) {
    console.error("Get Company Shifts > Failed to get shifts >", err);
    return fallback;
  }
}
