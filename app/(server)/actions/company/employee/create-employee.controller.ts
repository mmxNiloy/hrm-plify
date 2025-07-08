"use server";

import { CreateEmployeeSchema } from "@/schema/form/user.schema";
import { z } from "zod";
import executeRequest from "../../network/request-builder.service";

interface InputProps {
  companyId: string;
  data: z.infer<typeof CreateEmployeeSchema>;
}

export default async function createEmployee({ companyId, data }: InputProps) {
  return await executeRequest({
    method: "POST",
    endpoint: ["v2", "employee", "company", companyId].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
