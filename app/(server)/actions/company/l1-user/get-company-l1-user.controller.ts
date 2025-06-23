"use server";

import {
  ICompanyAuthorisedDetails,
  ICompanyL1User,
} from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function getCompanyL1User(id: string) {
  return await executeRequest<ICompanyL1User>({
    method: "GET",
    endpoint: ["v2", "company", id, "l1-user"].join("/"),
    authenticate: true,
  });
}
