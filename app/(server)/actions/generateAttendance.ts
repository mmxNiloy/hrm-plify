"use server";

import { IAttendanceGenerationResponse } from "@/schema/AttendanceSchema";
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
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/attendance/admin/generate`,
      {
        method: "POST",
        body: JSON.stringify({ company_id, employee_id, from_date, to_date }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      return (await apiRes.json()) as IAttendanceGenerationResponse;
    }

    console.error(
      "Actions > Generate Attendance > Failed to generate attendance",
      { error: await apiRes.json(), status: apiRes.status }
    );
  } catch (err) {
    console.error(
      "Actions > Generate Attendance > Failed to generate attendance",
      err
    );
  }

  return undefined;
}
