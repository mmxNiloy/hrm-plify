"use server";

import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Filter {
  employee_id?: number;
  sort: string;
  from_date?: string;
  end_date?: string;
}

interface Props {
  company_id: number;
  limit: number;
  page: number;
  filters?: Filter;
}

function generateFilterParams(filters?: Filter) {
  if (!filters) return "";

  var result = `&sort=${filters.sort}`;
  if (filters.from_date)
    result = result.concat(`&from_date=${filters.from_date}`);
  if (filters.end_date) result = result.concat(`&end_date=${filters.end_date}`);
  if (filters.employee_id)
    result = result.concat(`&employee_id=${filters.employee_id}`);
  return result;
}

export async function getAttendanceReports({
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
    }/attendance/admin/generate-report/${company_id}?page=${page}&limit=${limit}${generateFilterParams(
      filters
    )}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<{
    message: string;
    data: IAttendanceReport[];
  }>(req);
  if (error) {
    console.error(
      "Actions > Get Attendance Report > Failed to get attendance report",
      error
    );

    return { error };
  }

  return { data: data.data };
}
