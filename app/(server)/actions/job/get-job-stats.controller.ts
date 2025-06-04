"use server";
import { IJobStat } from "@/schema/JobSchema";
import executeRequest from "../network/request-builder.service";

export default async function getJobStats(company_id: string) {
  return await executeRequest<IJobStat[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["recruitment", "company", "stats", company_id].join("/"),
  });
}
