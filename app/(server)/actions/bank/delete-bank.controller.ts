"use server";

import { IBank } from "@/schema/form/bank.schema";
import executeRequest from "../network/request-builder.service";
import { revalidatePath } from "next/cache";

export default async function deleteBank(bankId: number) {
  const result = await executeRequest<IBank>({
    method: "DELETE",
    endpoint: ["bank", bankId.toString()].join("/"),
    authenticate: true,
  });

  if (!result.error) {
    revalidatePath("/dashboard/bank", "page");
  }

  return result;
}
