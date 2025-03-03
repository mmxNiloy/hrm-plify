"use server";

import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { IOrganogramDB } from "@/schema/OrganogramSchema";
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
}

export async function getOrganogramFile(orgChart: IOrganogramDB) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  if (!orgChart.file_url) return { data: orgChart };

  const req = fetch(orgChart.file_url, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const { data: file, error } = await withError<string>(req);
  if (error) {
    console.error(
      "Actions > Get an organogram > Failed to get an organogram",
      error
    );

    return { error };
  }

  return { data: { ...orgChart, file } };
}
