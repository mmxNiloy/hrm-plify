import { z } from "zod";

export const CreateDesignationSchema = z.object({
  department_id: z.coerce.number().positive(),
  designation_name: z.string(),
});

export const UpdateDesignationSchema = CreateDesignationSchema.partial();
