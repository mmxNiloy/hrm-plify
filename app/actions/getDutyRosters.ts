"use server";
import { IPaginatedDutyRosters, IPaginatedOffDays } from "@/schema/RotaSchema";
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
  const fallback: IPaginatedDutyRosters = {
    message: "No data found",
    data: [],
    total_page: 1,
    data_count: 0,
  };

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

    const apiRes = await fetch(
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

    if (apiRes.ok) {
      const result = (await apiRes.json()) as IPaginatedDutyRosters;
      return result;
    }

    console.error("Get company shifts > Failed to get company shifts", {
      status: apiRes.status,
    });

    return fallback;
  } catch (err) {
    console.error("Get Company Shifts > Failed to get shifts >", err);
    return fallback;
  }
}
