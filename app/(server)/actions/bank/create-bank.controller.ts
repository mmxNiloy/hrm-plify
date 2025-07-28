"use server";

import { BillingType, IBilling } from "@/schema/form/billing.schema";
import executeRequest from "../network/request-builder.service";
import { revalidatePath } from "next/cache";
import z from "zod";
import { BankSchema } from "@/schema/form/bank.schema";

export default async function createBank(data: z.infer<typeof BankSchema>) {
  const result = await executeRequest<IBilling>({
    endpoint: "bank",
    authenticate: true,
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!result.error) {
    revalidatePath("/dashboard/bank", "page");
  }

  return result;
}
