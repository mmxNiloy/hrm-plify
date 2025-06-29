"use server";

import executeRequest from "../../network/request-builder.service";
import { UpdateCompanyDocumentSchema } from "@/schema/form/company.schema";
import z from "zod";

export default async function updateCompanyDocument(
  docId: string,
  data: z.infer<typeof UpdateCompanyDocumentSchema>
) {
  return await executeRequest({
    method: "PUT",
    authenticate: true,
    endpoint: ["v2", "company", "document", docId].join("/"),
    body: JSON.stringify(data),
  });
}
