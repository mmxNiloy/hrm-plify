"use server";

import { IAttendanceRecord } from "@/schema/AttendanceSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  company_id: number;
  employee_id: number;
}

export default async function checkInToday({ company_id, employee_id }: Props) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/attendance/check-in-today`, {
    method: "POST",
    body: JSON.stringify({
      company_id,
      employee_id,
    }),
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
  });

  const { data, error } = await withError<IAttendanceRecord>(req);
  if (error) {
    console.error(
      "Actions > Check in attendance of employee > Failed to check in attendance",
      error
    );

    return { error };
  }

  return { data };
}
