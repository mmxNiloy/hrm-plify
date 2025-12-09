"use server";

import { IEmployee } from "@/schema/EmployeeSchema";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  employeeId: string;
  status: "TERMINATED" | "RESIGNED" | "RETIRED";
}

export default async function removeEmployee({
  employeeId,
  status,
}: InputProps) {
  return await executeRequest<IEmployee>({
    method: "PATCH",
    endpoint: ["v2", "employee", employeeId].join("/"),
    authenticate: true,
    body: JSON.stringify({
      status,
      contract_end_date: new Date().toISOString(),
    }),
  });
}
