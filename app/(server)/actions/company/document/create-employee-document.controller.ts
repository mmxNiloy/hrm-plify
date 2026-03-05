"use server";

import executeRequest from "../../network/request-builder.service";
import { CompanyDocumentSchema } from "@/schema/form/company.schema";
import z from "zod";

export default async function createEmployeeDocument(
  employeeId: string,
  data: z.infer<typeof CompanyDocumentSchema>,
) {
  return await executeRequest({
    method: "POST",
    authenticate: true,
    endpoint: ["v2", "employee", "document", employeeId].join("/"),
    body: JSON.stringify(data),
  });
}
