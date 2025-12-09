"use server";

import { ICompanyAuthorisedDetails, ICompanyKeyContact } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function getCompanyKeyContact(id: string) {
  return await executeRequest<ICompanyKeyContact>({
    method: "GET",
    endpoint: ["v2", "company", id, "key-contact"].join("/"),
    authenticate: true,
  });
}
