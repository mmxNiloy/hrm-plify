"use server";

import executeRequest from "../../network/request-builder.service";
import { IDesignation } from "@/schema/DesignationSchema";

export default async function deleteDesignation(designationId: string) {
  return await executeRequest<IDesignation>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["v2", "designation", designationId].join("/"),
  });
}
