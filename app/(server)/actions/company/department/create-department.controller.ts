"use server";

import { z } from "zod";
import executeRequest from "../../network/request-builder.service";
import { IDepartment } from "@/schema/CompanySchema";
import { CreateDepartmentSchema } from "@/schema/form/department.schema";

export default async function createDepartment(
  companyId: string,
  data: z.infer<typeof CreateDepartmentSchema>
) {
  return await executeRequest<IDepartment>({
    method: "POST",
    authenticate: true,
    endpoint: ["v2", "department", "company", companyId].join("/"),
    body: JSON.stringify(data),
  });
}
