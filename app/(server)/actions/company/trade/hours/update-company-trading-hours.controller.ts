"use server";

import { z } from "zod";
import executeRequest from "../../../network/request-builder.service";
import { UpdateTradingHoursSchema } from "@/schema/form/company.schema";

export default async function updateCompanyTradingHours(
  id: string,
  data: z.infer<typeof UpdateTradingHoursSchema>
) {
  return await executeRequest({
    method: "PUT",
    endpoint: ["v2", "company", id, "trade-hours"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
