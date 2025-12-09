"use server";

import executeRequest from "../../network/request-builder.service";
import { ICompanyUser } from "@/schema/UserSchema";

interface InputProps {
  companyId: string;
  page: number;
  limit: number;
  isActive?: "all" | "1" | "0";
  search?: string;
}

export async function getCompanyAdmins({ companyId, page, limit }: InputProps) {
  return await executeRequest<ICompanyUser[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "company", companyId, "admin"].join("/"),
    query: {
      page,
      limit,
    },
  });
}
