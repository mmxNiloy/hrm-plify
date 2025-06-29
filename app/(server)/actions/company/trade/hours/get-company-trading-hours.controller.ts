"use server";

import executeRequest from "../../../network/request-builder.service";
import { z } from "zod";
import { TradingHourSchema } from "@/schema/form/company.schema";

type TradeHour = z.infer<typeof TradingHourSchema>;

export default async function getCompanyTradingHours(id: string) {
  return await executeRequest<TradeHour[]>({
    method: "GET",
    endpoint: ["v2", "company", id, "trade-hours"].join("/"),
    authenticate: true,
  });
}
