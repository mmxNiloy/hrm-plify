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

export async function getAllOrganograms(company_id: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/organogram/${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IOrganogramDB[]>(req);
  if (error) {
    console.error(
      "Actions > Get All Attendance Reports > Failed to get all attendance reports",
      error
    );

    return { error };
  }

  return { data };
}
