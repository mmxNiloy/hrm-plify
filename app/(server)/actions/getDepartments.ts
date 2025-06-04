"use server";

import { IDepartment, IPaginatedDepartment } from "@/schema/CompanySchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getDepartments({
  company_id,
  page,
  limit,
}: {
  company_id: string;
  page: number;
  limit: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-departments/${company_id}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedDepartment>(req);
  if (error) {
    console.error(
      "Actions > Get Departments of a company > Failed to get departments of a company >",
      error
    );

    return { error };
  }

  return { data };
}

export async function getAllDepartments(company_id: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-all-departments/${company_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IDepartment[]>(req);
  if (error) {
    console.error(
      "Action > Get all departments of a company > Failed to get all departments >",
      error
    );
    return { error };
  }

  return { data };
}
