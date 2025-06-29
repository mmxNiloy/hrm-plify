"use server";

import { ICompanyDoc } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  companyId: string;
  page?: number;
  limit?: number;
}

export default async function getCompanyDocuments({
  companyId,
  page = 1,
  limit = 10,
}: InputProps) {
  return await executeRequest<ICompanyDoc[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "company", "document", companyId].join("/"),
    query: [
      ["page", page.toString()],
      ["limit", limit.toString()],
    ],
  });
}
