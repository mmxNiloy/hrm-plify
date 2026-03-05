"use server";

import { ICompanyDoc, IEmployeeDoc } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  employeeId: string;
  page?: number;
  limit?: number;
}

export default async function getEmployeeDocuments({
  employeeId,
  page = 1,
  limit = 10,
}: InputProps) {
  return await executeRequest<IEmployeeDoc[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "employee", "document", employeeId].join("/"),
    query: {
      page,
      limit,
    },
  });
}
