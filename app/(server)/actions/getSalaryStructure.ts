"use server";

import { IPaginatedEmployeeSalaryStructure } from "@/schema/Payroll";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  company_id: string | number;
  page: number;
  limit: number;
}

export async function getSalaryStructure({ company_id, page, limit }: Props) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/payroll/salary-structure/${company_id}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );

  const { data, error } = await withError<IPaginatedEmployeeSalaryStructure>(
    req
  );

  if (error) {
    console.error(
      "Actions > Get Company All Employees' Salary Structures > Failed to all employees' salary structures >",
      error
    );
    return { error };
  }
  return { data };
}
