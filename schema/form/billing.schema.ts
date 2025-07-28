import z from "zod";
import { IBank } from "./bank.schema";
import { ICompany } from "../CompanySchema";
import { IUser } from "../UserSchema";

export const BillItemSchema = z.object({
  narration: z.string(),
  quantity: z.coerce.number().positive(),
  unit_price: z.coerce.number().positive(),
  taxable_unit_price: z.coerce.number().positive(),
});

export const BillingSchema = z.object({
  company_id: z.coerce.number().positive(),
  recipient: z.string(),
  address: z.string(),
  bank_id: z.coerce.number().positive(),
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
    .optional()
    .default("UNPAID"),
  items: z
    .array(BillItemSchema)
    .min(1, "Please add at least one item to the billing"),
});

export const UpdateBillingSchema = BillingSchema.omit({
  company_id: true,
}).partial();

export type BillingType = z.infer<typeof BillingSchema>;
export interface IBilling extends BillingType {
  id: number;
  created_at: string;
  updated_at: string;
  bank: IBank;
  company: ICompany;
  author: IUser;
}
