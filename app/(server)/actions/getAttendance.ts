"use server";

import { IPaginatedAttendance } from "@/schema/AttendanceSchema";
import { cookies } from "next/headers";

interface Props {
  company_id: number;
  limit: number;
  page: number;
  filters: {
    department: number | undefined;
    designation: number | undefined;
    employee: number | undefined;
    from_date: string | undefined;
    to_date: string | undefined;
  };
}

export async function getAttendance({
  company_id,
  limit,
  page,
  filters,
}: Props) {
  const fallback: IPaginatedAttendance = {
    data: [],
    data_count: 0,
    total_page: 1,
  };

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${
        process.env.API_BASE_URL
      }/company/operation/get-attendance/${company_id}?limit=${limit}&page=${page}${
        filters.department ? `&${filters.department}` : ""
      }${filters.designation ? `&${filters.designation}` : ""}${
        filters.employee ? `&${filters.employee}` : ""
      }${filters.from_date ? `&${filters.from_date}` : ""}${
        filters.to_date ? `&${filters.to_date}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      return (await apiRes.json()) as IPaginatedAttendance;
    }

    console.error(
      "Actions > Get Company Attendance > Failed to get company attendance",
      { error: await apiRes.json(), status: apiRes.status }
    );
  } catch (err) {
    console.error(
      "Actions > Get Company Attendance > Failed to get company attendance",
      err
    );
  }

  return fallback;
}
