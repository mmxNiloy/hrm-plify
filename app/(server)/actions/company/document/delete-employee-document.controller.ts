"use server";

import { IEmployeeDoc } from "@/schema/CompanySchema";
import executeRequest from "../../network/request-builder.service";

export default async function deleteEmployeeDocument(docId: string) {
  return await executeRequest<IEmployeeDoc>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["v2", "employee", "document", docId].join("/"),
  });
}
