"use server";

import { IBilling, UpdateBillingSchema } from "@/schema/form/billing.schema";
import z from "zod";
import executeRequest from "../network/request-builder.service";
import { revalidatePath } from "next/cache";

export default async function updateBilling(
  billId: string,
  data: z.infer<typeof UpdateBillingSchema>
) {
  const result = await executeRequest<IBilling>({
    method: "PATCH",
    authenticate: true,
    endpoint: ["bill", billId].join("/"),
    body: JSON.stringify(data),
  });

  if (!result.error) {
    revalidatePath("/dashboard/billing", "page");
  }

  return result;
}
