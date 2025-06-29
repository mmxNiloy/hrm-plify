"use server";

import { IDepartment } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  companyId: string;
  isActive?: "all" | "1" | "0";
}

export default async function getAllDepartments({
  companyId,
  isActive = "1",
}: InputProps) {
  return await executeRequest<IDepartment[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "department", "all", "company", companyId].join("/"),
    query: [["isActive", isActive]],
  });
}
