"use server";

import { IPaginatedOffDays } from "@/schema/RotaSchema";
import { withError } from "@/utils/Debug";
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
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/rota/day-off/${company_id}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );

  const { data, error } = await withError<IPaginatedOffDays>(req);
  if (error) {
    console.error(
      "Actions > Get Company Off Days > Failed to get off days >",
      error
    );
    return { error };
  }

  return { data };
}
