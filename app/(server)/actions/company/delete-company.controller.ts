"use server";

import { ICompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";

export async function deleteCompany(id: string) {
  return await executeRequest<ICompany>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["v2", "company", id].join("/"),
  });
}
