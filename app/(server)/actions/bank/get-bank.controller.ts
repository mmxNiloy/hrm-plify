"use server";

import executeRequest from "../network/request-builder.service";
import { IBank } from "@/schema/form/bank.schema";

export default async function getBank(bankId: string) {
  return await executeRequest<IBank>({
    endpoint: ["bank", bankId].join("/"),
    authenticate: true,
    method: "GET",
  });
}
