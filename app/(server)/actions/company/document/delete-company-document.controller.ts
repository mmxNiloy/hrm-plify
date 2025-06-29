"use server";

import { ICompanyDoc } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function deleteCompanyDocument(docId: string) {
  return await executeRequest<ICompanyDoc>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["v2", "company", "document", docId].join("/"),
  });
}
