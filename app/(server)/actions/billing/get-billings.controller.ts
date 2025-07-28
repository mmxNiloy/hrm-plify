"use server";

import { IBilling } from "@/schema/form/billing.schema";
import executeRequest from "../network/request-builder.service";
import z from "zod";
import { PaginationSchema } from "@/schema/form/pagination.schema";

const InputSchema = PaginationSchema.extend({
  companyId: z.coerce.number().positive(),
  authorId: z.coerce.number().positive(),
  bankId: z.coerce.number().positive(),
  status: z.enum([
    "UNPAID",
    "PAID",
    "PARTIALLY_PAID",
    "CANCELLED",
    "REFUNDED",
    "RETURNED",
    "OVERDUE",
    "EXPIRED",
  ]),
});
type InputProps = z.infer<typeof InputSchema>;

export default async function getBillings(params: InputProps) {
  return await executeRequest<IBilling[]>({
    endpoint: "bill",
    authenticate: true,
    method: "GET",
    query: params,
  });
}
