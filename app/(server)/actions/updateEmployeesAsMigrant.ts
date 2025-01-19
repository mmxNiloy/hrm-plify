"use server";

import { IEmployee } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface ReqBody {
  employee_id: number;
  is_foreign: boolean;
}

export async function updateEmployeesAsMigrant(employees: ReqBody[]) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(`${process.env.API_BASE_URL}/employee/mark-as-migrant`, {
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({ employees }),
  });

  const { data, error } = await withError<IEmployee[]>(req);

  if (error) {
    console.error(
      "Actions > Update Employees As Migrant > Failed to update >",
      error
    );
    return { error };
  }

  return { data };
}
