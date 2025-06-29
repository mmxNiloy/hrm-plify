"use server";

import { z } from "zod";
import executeRequest from "../../network/request-builder.service";
import { UpdateDesignationSchema } from "@/schema/form/designation.schema";
import { IDesignation } from "@/schema/DesignationSchema";

export default async function updateDesignation(
  designationId: string,
  data: z.infer<typeof UpdateDesignationSchema>
) {
  return await executeRequest<IDesignation>({
    method: "PATCH",
    authenticate: true,
    endpoint: ["v2", "designation", designationId].join("/"),
    body: JSON.stringify(data),
  });
}
