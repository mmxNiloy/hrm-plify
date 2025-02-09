"use server";

import { IAttendanceRecord } from "@/schema/AttendanceSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export default async function didAttendToday() {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/attendance/check-today`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const { data, error } = await withError<IAttendanceRecord>(req);
  if (error) {
    console.error(
      "Actions > Get attendance status of employee > Failed to get attendance status of employee",
      error
    );

    return { error };
  }

  return { data };
}
