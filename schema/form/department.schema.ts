import z from "zod";

export const CreateDepartmentSchema = z.object({
  dpt_name: z.string().min(3),
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();
