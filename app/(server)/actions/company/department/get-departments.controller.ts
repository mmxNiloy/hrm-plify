"use server";

import { IDepartment } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  isActive?: "all" | "1" | "0";
}

export default async function getDepartments({
  companyId,
  page = 1,
  limit = 10,
  search = "",
  isActive = "all",
}: InputProps) {
  return await executeRequest<IDepartment[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "department", "company", companyId].join("/"),
    query: [
      ["page", page.toString()],
      ["limit", limit.toString()],
      ["search", search],
      ["isActive", isActive],
    ],
  });
}
