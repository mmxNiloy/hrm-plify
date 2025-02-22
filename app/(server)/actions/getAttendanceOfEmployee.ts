"use server";

import { IPaginatedAttendanceRecords } from "@/schema/AttendanceSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  employeeId: number;
  limit: number;
  page: number;
  sort: "ASC" | "DESC";
}

export async function getAttendanceOfEmployee({
  employeeId,
  limit,
  page,
  sort,
}: Props) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/attendance/get-attendance-of-employee/${employeeId}?limit=${limit}&page=${page}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedAttendanceRecords>(req);
  if (error) {
    console.error(
      "Actions > Get Employee's Attendance > Failed to get employee's attendance",
      error
    );

    return { error };
  }

  return { data };
}
