"use server";

import { ICompanyUser } from "@/schema/UserSchema";
import executeRequest from "../../network/request-builder.service";
import { z } from "zod";
import { CreateCompanyUserSchema } from "@/schema/form/company.schema";

export default async function createCompanyAdmin(
  companyId: string,
  data: z.infer<typeof CreateCompanyUserSchema>
) {
  return await executeRequest<ICompanyUser>({
    method: "POST",
    endpoint: ["v2", "company", companyId, "admin"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
