"use server";
import { IFavoriteCompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";

export default async function getJobStats(company_id: string) {
  return await executeRequest<IFavoriteCompany>({
    method: "POST",
    authenticate: true,
    endpoint: ["company", "favorite"].join("/"),
    body: JSON.stringify({ company_id }),
  });
}
