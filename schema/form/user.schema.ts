import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().optional(),
  password: z.string(),
});

export const CreateEmployeeSchema = CreateUserSchema.omit({
  password: true,
}).extend({
  emp_type_id: z.coerce.number().positive().optional(),
  department_id: z.coerce.number().positive(),
  designation_id: z.coerce.number().positive(),
  image: z.string().url("Invalid Image URL").optional(),
  is_foreign: z.boolean().optional().default(false),
});

export const UpdateUserSchema = CreateUserSchema.omit({
  password: true,
}).partial();
