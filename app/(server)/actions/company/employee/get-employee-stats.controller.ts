"use server";

import { ICompanyEmployeeStats } from "@/schema/StatsSchema";
import executeRequest from "../../network/request-builder.service";

export default async function getEmployeeStats(companyId: string) {
  return await executeRequest<ICompanyEmployeeStats>({
    method: "GET",
    endpoint: ["v2", "company", companyId, "employee", "stats"].join("/"),
    authenticate: true,
  });
}
