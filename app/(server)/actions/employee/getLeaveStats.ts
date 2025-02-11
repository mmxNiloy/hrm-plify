"use server";

import { IEmployeeLeaveStats } from "@/schema/StatsSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getLeaveStats(limit?: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/stats/employee/leave?limit=${limit ?? 7}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<IEmployeeLeaveStats>(req);

  if (error) {
    console.error(
      "Actions > Employee > Get Leave stats > Failed to get leave stats >",
      error
    );
    return { error };
  }

  return { data };
}
