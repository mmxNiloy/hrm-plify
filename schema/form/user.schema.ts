import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().optional(),
  password: z.string(),
});

export const UpdateUserSchema = CreateUserSchema.omit({
  password: true,
}).partial();
