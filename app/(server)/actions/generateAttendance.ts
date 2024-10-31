"use server";

import { IAttendanceGenerationResponse } from "@/schema/AttendanceSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  company_id: number;
  employee_id: number;
  from_date: string;
  to_date: string;
}

export async function generateAttendance({
  company_id,
  employee_id,
  from_date,
  to_date,
}: Props) {
  console.log("Actions > Generate Attendance > Request Body >", {
    company_id,
    employee_id,
    from_date,
    to_date,
  });
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/attendance/admin/generate`, {
    method: "POST",
    body: JSON.stringify({ company_id, employee_id, from_date, to_date }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });

  const { data, error } = await withError<IAttendanceGenerationResponse>(req);
  if (error) {
    console.error(
      "Actions > Generate Attendance > Failed to generate attendance",
      error
    );

    return { error };
  }

  return { data };
}
