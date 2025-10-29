"use server";

import {
  CreateBankAccountDto,
  IBankAccount,
  UpdateBankAccountDto,
} from "@/schema/form/bank.schema";
import executeRequest from "../network/request-builder.service";

export async function createBankAccount(data: CreateBankAccountDto) {
  const result = await executeRequest<IBankAccount>({
    endpoint: "bank/account",
    authenticate: true,
    method: "POST",
    body: JSON.stringify(data),
  });

  return result;
}

export async function updateBankAccount(
  id: number,
  data: UpdateBankAccountDto
) {
  const result = await executeRequest<IBankAccount>({
    endpoint: ["bank/account", id.toString()].join("/"),
    authenticate: true,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return result;
}

export async function deleteBankAccount(accountId: number) {
  const result = await executeRequest<IBankAccount>({
    endpoint: ["bank/account", accountId.toString()].join("/"),
    authenticate: true,
    method: "DELETE",
  });

  return result;
}
