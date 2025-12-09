"use server";

import { z } from "zod";
import executeRequest from "../../network/request-builder.service";
import { IDepartment } from "@/schema/CompanySchema";
import { UpdateDepartmentSchema } from "@/schema/form/department.schema";

export default async function updateDepartment(
  departmentId: string,
  data: z.infer<typeof UpdateDepartmentSchema>
) {
  return await executeRequest<IDepartment>({
    method: "PATCH",
    authenticate: true,
    endpoint: ["v2", "department", departmentId].join("/"),
    body: JSON.stringify(data),
  });
}
