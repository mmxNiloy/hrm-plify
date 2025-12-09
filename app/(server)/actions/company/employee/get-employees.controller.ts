"use server";

import { IEmployee, IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import executeRequest from "../../network/request-builder.service";

type EmployeeStatus = IEmployee["status"];

interface InputProps {
  companyId: string;
  page?: number;
  limit?: number;
  employeeStatus?: EmployeeStatus[];
  isForeign?: "all" | "1" | "0";
}

export default async function getEmployees({
  companyId,
  page = 1,
  limit = 10,
  employeeStatus = ["ACTIVE"],
  isForeign = "0",
}: InputProps) {
  return await executeRequest<IEmployeeWithUserMetadata[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "employee", "company", companyId].join("/"),
    query: {
      page,
      limit,
      isForeign,
      status: employeeStatus,
    },
  });
}
