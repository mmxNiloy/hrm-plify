"use server";

import { IBilling } from "@/schema/form/billing.schema";
import executeRequest from "../network/request-builder.service";
import { IBank } from "@/schema/form/bank.schema";

interface InputProps {
  company_id?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export default async function getBanks(props: InputProps) {
  return await executeRequest<IBank[]>({
    endpoint: ["bank"].join("/"),
    authenticate: true,
    method: "GET",
    query: {
      ...props,
    },
  });
}
