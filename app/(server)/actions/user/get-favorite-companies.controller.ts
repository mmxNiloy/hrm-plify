"use server";
import { IFavoriteCompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";

export default async function getFavoriteCompanies() {
  return await executeRequest<IFavoriteCompany[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["company", "favorite"].join("/"),
  });
}
