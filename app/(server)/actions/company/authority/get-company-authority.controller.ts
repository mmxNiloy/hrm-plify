"use server";

import { ICompanyAuthorisedDetails } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function getCompanyAuthority(id: string) {
  return await executeRequest<ICompanyAuthorisedDetails>({
    method: "GET",
    endpoint: ["v2", "company", id, "authority"].join("/"),
    authenticate: true,
  });
}
