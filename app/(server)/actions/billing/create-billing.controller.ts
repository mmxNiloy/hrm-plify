"use server";

import { BillingType, IBilling } from "@/schema/form/billing.schema";
import executeRequest from "../network/request-builder.service";
import { revalidatePath } from "next/cache";

export default async function createBilling(data: BillingType) {
  const result = await executeRequest<IBilling>({
    endpoint: "bill",
    authenticate: true,
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!result.error) {
    revalidatePath("/dashboard/billing", "page");
  }

  return result;
}
