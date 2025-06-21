"use server";
import executeRequest from "../network/request-builder.service";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface Props {
  employment_type: string;
}

export default async function createEmploymentType({ employment_type }: Props) {
  return await executeRequest<IEmploymentType>({
    method: "POST",
    endpoint: "employment-type",
    body: JSON.stringify({
      employment_type,
    }),
    authenticate: true,
  });
}
