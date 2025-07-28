"use server";

import { revalidatePath } from "next/cache";
import executeRequest from "../network/request-builder.service";

export default async function deleteBill(billId: string) {
  const result = await executeRequest({
    endpoint: ["bill", billId].join("/"),
    authenticate: true,
    method: "DELETE",
  });

  if (!result.error) {
    revalidatePath("/dashboard/billing", "page");
  }

  return result;
}
