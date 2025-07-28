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
  create_at: string;
  updated_at: string;

  company?: ICompany;
  author: IUser;

  _count: {
    accounts: number;
  };
}
