"use server";

import { IEmployee } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  employee_id: number;
  company_id: number;
  from_date: Date;
  to_date: Date;
  value: number;
}

export async function updateAttendance({
  employee_id,
  company_id,
  from_date,
  to_date,
  value,
}: Props) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/attendance/admin/bulk-update-attendance`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        employee_id,
        company_id,
        from_date,
        to_date,
        value,
      }),
    }
  );

  const { data, error } = await withError<IEmployee[]>(req);

  if (error) {
    console.error(
      "Actions > Update Employees Attendance > Failed to update >",
      error
    );
    return { error };
  }

  return { data };
}
