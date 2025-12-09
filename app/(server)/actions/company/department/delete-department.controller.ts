"use server";

import { z } from "zod";
import executeRequest from "../../network/request-builder.service";
import { IDepartment } from "@/schema/CompanySchema";

export default async function deleteDepartment(departmentId: string) {
  return await executeRequest<IDepartment>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["v2", "department", departmentId].join("/"),
  });
}
