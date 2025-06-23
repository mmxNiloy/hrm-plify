"use server";

import { ICompanyAddress } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function getCompanyAddress(id: string) {
  return await executeRequest<ICompanyAddress>({
    method: "GET",
    endpoint: ["v2", "company", id, "address"].join("/"),
    authenticate: true,
  });
}
