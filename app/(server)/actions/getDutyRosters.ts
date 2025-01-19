"use server";
import { IPaginatedDutyRosters } from "@/schema/RotaSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface IDutyRosterFilters {
  department_id?: number;
  shift_id?: number;
  employee_id?: number;
  from_date?: string;
  to_date?: string;
}

export async function getDutyRosters({
  company_id,
  page,
  limit,
  filters,
}: {
  company_id: number;
  page: number;
  limit: number;
  filters?: IDutyRosterFilters;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${
      process.env.API_BASE_URL
    }/rota/duty-roaster/${company_id}?page=${page}&limit=${limit}${
      filters
        ? `&department_id=${filters.department_id}&shift_id=${filters.shift_id}&employee_id=${filters.employee_id}&from_date=${filters.from_date}&to_date=${filters.to_date}`
        : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );

  const { data, error } = await withError<IPaginatedDutyRosters>(req);
  if (error) {
    console.error(
      "Actions > Get Company Duty Rosters > Failed to get duty rosters >",
      error
    );
    return { error };
  }

  return { data };
}
