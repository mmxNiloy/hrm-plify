import { weekDays } from "@/utils/Misc";
import { z } from "zod";

export const CreateCompanySchema = z.object({
  company_name: z
    .string()
    .min(3, "Company name must be at least 3 characters long.")
    .max(128, "Company name cannot exceed 128 characters."),
  industry: z
    .string()
    .max(128, "Industry name cannot exceed 128 characters.")
    .optional(),
  headquarters: z
    .string()
    .max(256, "HQ cannot exceed 256 characters.")
    .optional(),
  contact_number: z.string().optional(),
  founded_year: z.coerce.number().optional(),
  website: z.string().url("Invalid Website/URL").optional(),
  logo: z.string().url("Invalid Logo URL").optional(),
  email: z.string().email("Invalid Email").optional(),
  is_current_user_owner: z.coerce.number().min(0).max(1).optional().default(0),
  is_active: z.coerce.number().min(0).max(1).optional().default(1),
});

export const UpdateCompanySchema = CreateCompanySchema.omit({
  is_current_user_owner: true,
});

export const CompanyAuthoritySchema = z.object({
  fname: z.string(),
  lname: z.string(),
  designation: z.string(),
  phone_no: z.string(),
  email: z.string().email("Invalid email format"),
  doc_link: z.string().url("Invalid document link").optional(),
  offence_history: z.string().optional().default(""),
});

export const CompanyAddressSchema = z.object({
  postcode: z.string(),
  address_line_1: z.string(),
  address_line_2: z.string().optional().default(""),
  address_line_3: z.string().optional().default(""),
  city_county: z.string(),
  country: z.string(),
});

export const CompanyTradeDetailsSchema = z.object({
  company_reg: z.string(),
  type_of_company: z.string(),
  trade_name: z.string(),
  sector: z.string(),
  org_email: z.string().email("Invalid email format"),
  change_of_name_5: z.enum(["yes", "no"]).optional().default("no"),
  faced_penalty_org: z.enum(["yes", "no"]).optional().default("no"),
});

export const TradingHourSchema = z.object({
  day_name: z.enum(weekDays),
  trade_status: z.coerce.number().min(0).max(1).optional().default(0),
  opening_time: z.string().time().optional().default("00:00"),
  closing_time: z.string().time().optional().default("23:59"),
});

export const UpdateTradingHoursSchema = z.object({
  trading_hours: z.array(TradingHourSchema).refine((data) => {
    const days = data.map((item) => item.day_name);
    return (
      new Set(days).size === 7 && days.every((day) => weekDays.includes(day))
    );
  }),
});

export const CompanyDocumentSchema = z.object({
  doc_type: z.string(),
  doc_name: z.string(),
  doc_link: z.string().url("Invalid document link"),
});

export const UpdateCompanyDocumentSchema = CompanyDocumentSchema.partial();

export const UpdateCompanyAdminSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    fname: z.string(),
    mname: z.string(),
    lname: z.string(),
  })
  .partial();

export const CreateCompanyUserSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  mname: z.string().optional(),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,128}$/.test(
          password
        ),
      {
        message:
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      }
    ),
});

export const UpdateCompanyUserSchema = CreateCompanyUserSchema.omit({
  password: true,
}).partial();
