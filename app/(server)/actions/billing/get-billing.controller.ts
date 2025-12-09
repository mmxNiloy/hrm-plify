"use server";

import { IBilling } from "@/schema/form/billing.schema";
import executeRequest from "../network/request-builder.service";

export default async function getBilling(billId: string) {
  return await executeRequest<IBilling>({
    endpoint: ["bill", billId].join("/"),
    authenticate: true,
    method: "GET",
  });
}
