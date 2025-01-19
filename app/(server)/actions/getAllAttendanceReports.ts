"use server";

import { IAttendanceReport } from "@/schema/AttendanceSchema";
import {
  AttendanceReportFilter,
  generateAttendanceReportFilterParams,
} from "@/utils/AttendanceReportFunctions";
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
  filters?: AttendanceReportFilter;
}

export async function getAllAttendanceReports({
  company_id,
  limit,
  page,
  filters,
}: Props) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  console.log("Filters >", filters);
  const req = fetch(
    `${
      process.env.API_BASE_URL
    }/attendance/admin/generate-report/all/${company_id}?page=${page}&limit=${limit}${generateAttendanceReportFilterParams(
      filters
    )}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IAttendanceReport[]>(req);
  if (error) {
    console.error(
      "Actions > Get All Attendance Reports > Failed to get all attendance reports",
      error
    );

    return { error };
  }

  return { data };
}
