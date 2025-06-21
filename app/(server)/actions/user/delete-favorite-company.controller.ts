"use server";
import { IFavoriteCompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";

export default async function getJobStats(company_id: string) {
  return await executeRequest<IFavoriteCompany>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["company", "favorite", company_id].join("/"),
  });
}
