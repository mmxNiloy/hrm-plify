"use server";

import executeRequest from "../../network/request-builder.service";
import { CompanyDocumentSchema } from "@/schema/form/company.schema";
import z from "zod";

export default async function createCompanyDocument(
  companyId: string,
  data: z.infer<typeof CompanyDocumentSchema>
) {
  return await executeRequest({
    method: "POST",
    authenticate: true,
    endpoint: ["v2", "company", "document", companyId].join("/"),
    body: JSON.stringify(data),
  });
}
