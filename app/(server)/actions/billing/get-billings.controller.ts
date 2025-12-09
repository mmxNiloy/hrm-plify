"use server";

import { IBilling } from "@/schema/form/billing.schema";
import executeRequest from "../network/request-builder.service";
import z from "zod";
import { PaginationSchema } from "@/schema/form/pagination.schema";

const InputSchema = PaginationSchema.extend({
  companyId: z.coerce.number().positive().optional(),
  authorId: z.coerce.number().positive().optional(),
  bankId: z.coerce.number().positive().optional(),
  status: z
    .enum([
      "UNPAID",
      "PAID",
      "PARTIALLY_PAID",
      "CANCELLED",
      "REFUNDED",
      "RETURNED",
      "OVERDUE",
      "EXPIRED",
    ])
    .optional(),
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
