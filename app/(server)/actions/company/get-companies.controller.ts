"use server";

import { ICompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";

export async function getCompanies({
  page,
  limit,
  isActive = "all",
  search = "",
}: {
  page: number;
  limit: number;
  isActive?: "all" | "1" | "0";
  search?: string;
}) {
  return await executeRequest<ICompany[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "company"].join("/"),
    query: [
      ["page", page.toString()],
      ["limit", limit.toString()],
      ["isActive", isActive],
      ["search", search],
    ],
  });
}
