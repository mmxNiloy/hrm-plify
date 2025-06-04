"use server";

import { ICompanyDoc } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function getDocument(docId: string) {
  return await executeRequest<ICompanyDoc>({
    method: "GET",
    authenticate: true,
    endpoint: ["company", "document", docId].join("/"),
  });
}
