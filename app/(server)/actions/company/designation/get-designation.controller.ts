"use server";

import executeRequest from "../../network/request-builder.service";
import { IDesignation } from "@/schema/DesignationSchema";

interface InputProps {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  isActive?: "all" | "1" | "0";
}

export default async function getDesignations({
  companyId,
  page = 1,
  limit = 10,
  search = "",
  isActive = "all",
}: InputProps) {
  return await executeRequest<IDesignation[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "designation", "company", companyId].join("/"),
    query: {
      page,
      limit,
      search,
      isActive,
    },
  });
}
