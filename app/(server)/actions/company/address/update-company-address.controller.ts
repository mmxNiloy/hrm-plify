"use server";

import executeRequest from "../../network/request-builder.service";
import z from "zod";
import { CompanyAddressSchema } from "@/schema/form/company.schema";

export default async function updateCompanyAddress(
  id: string,
  data: z.infer<typeof CompanyAddressSchema>
) {
  return await executeRequest({
    method: "PUT",
    endpoint: ["v2", "company", id, "address"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
