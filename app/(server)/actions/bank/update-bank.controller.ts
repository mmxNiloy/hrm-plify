"use server";

import z from "zod";
import executeRequest from "../network/request-builder.service";
import { revalidatePath } from "next/cache";
import { IBank, UpdateBankSchema } from "@/schema/form/bank.schema";

export default async function updateBank(
  bankId: string,
  data: z.infer<typeof UpdateBankSchema>
) {
  const result = await executeRequest<IBank>({
    method: "PATCH",
    authenticate: true,
    endpoint: ["bank", bankId].join("/"),
    body: JSON.stringify(data),
  });

  if (!result.error) {
    revalidatePath("/dashboard/bank", "page");
  }

  return result;
}
