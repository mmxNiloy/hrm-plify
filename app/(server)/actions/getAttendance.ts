"use server";

import { IPaginatedAttendance } from "@/schema/AttendanceSchema";
import { withError } from "@/utils/Debug";
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
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
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

  const { data, error } = await withError<IPaginatedAttendance>(req);
  if (error) {
    console.error(
      "Actions > Get Company Attendance > Failed to get company attendance",
      error
    );

    return { error };
  }

  return { data };
}
