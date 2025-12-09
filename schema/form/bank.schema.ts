import { z } from "zod";
import { ICompany } from "../CompanySchema";
import { IUser } from "../UserSchema";

export const BankSchema = z.object({
  company_id: z.coerce.number().positive().optional(),
  name: z.string().min(3, "Bank name must be at least 3 characters."),
  sortcode: z.string().regex(/^(\d){2}-(\d){2}-(\d){2}$/, "Invalid Sort Code."),
  priority: z
    .enum(["VERY_HIGH", "HIGH", "MEDIUM", "LOW", "VERY_LOW"])
    .optional()
    .default("MEDIUM"),
});

export const UpdateBankSchema = BankSchema.omit({
  company_id: true,
}).partial();

export type BankType = z.infer<typeof BankSchema>;

export interface IBank extends BankType {
  id: number;
  company_id?: number;
  author_id: number;
  name: string;
  created_at: string;
  updated_at: string;

  company?: ICompany;
  author: IUser;

  accounts: IBankAccount[];
}

export const BankAccountSchema = z.object({
  bank_id: z.coerce.number().positive(),
  account_number: z
    .string()
    .min(8, "Account number must be at least 8 characters."),
  account_type: z
    .string()
    .min(3, "Account name must be at least 3 characters."),
  tag: z.string().optional(),
  is_active: z.coerce.boolean().optional().default(true),
  currency: z
    .enum([
      "USD",
      "EUR",
      "JPY",
      "GBP",
      "CNY",
      "AUD",
      "CAD",
      "CHF",
      "HKD",
      "SGD",
    ])
    .optional()
    .default("GBP"),
});

export const BankAccountUpdateSchema = BankAccountSchema.partial();

export interface IBankAccount {
  bank_id: number;
  id: number;
  account_number: string;
  account_type: string;
  tag: string;
  is_active: boolean;
  currency: string;
  created_at: string;
  updated_at: string;

  bank?: IBank;
}

export type CreateBankAccountDto = Omit<
  IBankAccount,
  "id" | "created_at" | "updated_at"
>;

export type UpdateBankAccountDto = Partial<CreateBankAccountDto>;
