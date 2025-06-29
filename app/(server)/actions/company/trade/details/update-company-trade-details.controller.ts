"use server";

import { z } from "zod";
import executeRequest from "../../../network/request-builder.service";
import { CompanyTradeDetailsSchema } from "@/schema/form/company.schema";

export default async function updateCompanyTradeDetails(
  id: string,
  data: z.infer<typeof CompanyTradeDetailsSchema>
) {
  return await executeRequest({
    method: "PUT",
    endpoint: ["v2", "company", id, "trade-details"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
