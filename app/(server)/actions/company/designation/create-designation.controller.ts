"use server";

import { z } from "zod";
import executeRequest from "../../network/request-builder.service";
import { IDepartment } from "@/schema/CompanySchema";
import { CreateDesignationSchema } from "@/schema/form/designation.schema";
import { IDesignation } from "@/schema/DesignationSchema";

export default async function createDesignation(
  companyId: string,
  data: z.infer<typeof CreateDesignationSchema>
) {
  return await executeRequest<IDesignation>({
    method: "POST",
    authenticate: true,
    endpoint: ["v2", "designation", "company", companyId].join("/"),
    body: JSON.stringify(data),
  });
}
