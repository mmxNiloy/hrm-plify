"use server";

import executeRequest from "../network/request-builder.service";
import { revalidatePath } from "next/cache";
import z from "zod";
import { BankSchema, IBank } from "@/schema/form/bank.schema";

export default async function createBank(data: z.infer<typeof BankSchema>) {
  const result = await executeRequest<IBank>({
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
