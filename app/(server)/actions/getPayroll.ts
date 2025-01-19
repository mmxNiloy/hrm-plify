"use server";

import { IPaginatedEmployeeSalaryStructure, IPayroll } from "@/schema/Payroll";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Props {
  company_id: string | number;
  employee_id?: string;
  pay_period?: string;
}

export async function getPayroll({
  company_id,
  employee_id,
  pay_period,
}: Props) {
  if (!employee_id) return { data: [] };
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const date = new Date(pay_period ?? new Date());
  const req = fetch(
    `${process.env.API_BASE_URL}/payroll/salary/${date.getFullYear()}/${
      date.getMonth() + 1
    }?employee_id=${employee_id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );

  const { data, error } = await withError<IPayroll[]>(req);

  if (error) {
    console.error(
      "Actions > Get Company All Employees' Salary Structures > Failed to all employees' salary structures >",
      error
    );
    return { error };
  }
  return { data };
}
