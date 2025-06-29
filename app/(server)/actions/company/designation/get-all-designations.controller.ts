"use server";

import { IDepartment } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  companyId: string;
  isActive?: "all" | "1" | "0";
}

export default async function getAllDesignations({
  companyId,
  isActive = "1",
}: InputProps) {
  return await executeRequest<IDepartment[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "designation", "all", "company", companyId].join("/"),
    query: [["isActive", isActive]],
  });
}
