"use server";

import { IAttendanceReport } from "@/schema/AttendanceSchema";
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
  console.log(
    "Actions > Get Attendance Report > Endpoint",
    `${
      process.env.API_BASE_URL
    }/attendance/admin/generate-report/${company_id}?page=${page}&limit=${limit}${generateFilterParams(
      filters
    )}`
  );
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
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

    if (apiRes.ok) {
      const res = (await apiRes.json()) as {
        message: string;
        data: IAttendanceReport[];
      };
      return res.data;
    }
    console.error(
      "Actions > Get Attendance Report > Failed to get attendance report",
      { error: await apiRes.json(), status: apiRes.status }
    );
  } catch (err) {
    console.error(
      "Actions > Get Attendance Report > Failed to get attendance report",
      err
    );
  }

  return [];
}
