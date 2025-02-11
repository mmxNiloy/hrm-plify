"use server";
import { IEmployeeAttendanceStats } from "./../../../../schema/StatsSchema";

import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getAttendanceStats(limit?: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/stats/employee/attendance?limit=${limit ?? 7}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<IEmployeeAttendanceStats>(req);

  if (error) {
    console.error(
      "Actions > Employee > Get attendance stats > Failed to get attendance stats >",
      error
    );
    return { error };
  }

  return { data };
}
