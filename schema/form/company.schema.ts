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
