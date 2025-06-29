"use server";

import { ICompanyDoc } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function getDocument(docId: string) {
  return await executeRequest<ICompanyDoc>({
    method: "GET",
    authenticate: true,
    endpoint: ["v2", "company", "document-single", docId].join("/"),
  });
}
