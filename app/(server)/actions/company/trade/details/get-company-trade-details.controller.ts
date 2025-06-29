"use server";

import { ICompanyTradeDetails } from "@/schema/CompanySchema";
import executeRequest from "../../../network/request-builder.service";
import { z } from "zod";
import { CompanyTradeDetailsSchema } from "@/schema/form/company.schema";

export default async function getCompanyTradeDetails(id: string) {
  return await executeRequest<z.infer<typeof CompanyTradeDetailsSchema>>({
    method: "GET",
    endpoint: ["v2", "company", id, "trade-details"].join("/"),
    authenticate: true,
  });
}
