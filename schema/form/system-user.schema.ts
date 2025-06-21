import { z } from "zod";

export const SystemUserSchema = z.object({
  first_name: z.string(),
  middle_name: z.string().optional(),
  last_name: z.string(),
  status: z.enum(["active", "inactive"]),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128, "Password cannot exceed 128 characters.")
    .regex(/^[^\s]*$/, "Password cannot contain spaces.")
    .superRefine((pwd, ctx) => {
      const checks = [
        {
          regex: /[a-z]/,
          message: "Include at least one lowercase letter (a-z).",
        },
        {
          regex: /[A-Z]/,
          message: "Include at least one uppercase letter (A-Z).",
        },
        {
          regex: /[0-9]/,
          message: "Include at least one digit (0-9).",
        },
        {
          regex: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/,
          message: "Include at least one special character (e.g., !@#$%^&*).",
        },
      ];

      checks.forEach(({ regex, message }) => {
        if (!regex.test(pwd)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message,
          });
        }
      });
    }),
  read_permissions: z.string().array(),
  write_permissions: z.string().array(),
  update_permissions: z.string().array(),
});

export const UpdateSystemUserSchema = SystemUserSchema.omit({
  password: true,
}).partial();
