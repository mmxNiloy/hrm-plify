"use server";

import { IPaginatedAttendanceReport } from "@/schema/AttendanceSchema";
import {
  AttendanceReportFilter,
  generateAttendanceReportFilterParams,
} from "@/utils/AttendanceReportFunctions";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  company_id: number;
  limit: number;
  page: number;
  filters?: AttendanceReportFilter;
}
export async function getAttendanceReports({
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
    }/attendance/admin/generate-report/${company_id}?page=${page}&limit=${limit}${generateAttendanceReportFilterParams(
      filters
    )}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedAttendanceReport>(req);
  if (error) {
    console.error(
      "Actions > Get Attendance Report > Failed to get attendance report",
      error
    );

    return { error };
  }

  return { data };
}
