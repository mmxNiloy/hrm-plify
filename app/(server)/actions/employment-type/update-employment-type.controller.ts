"use server";
import executeRequest from "../network/request-builder.service";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface Props {
  id: number;
  employment_type: string;
  isActive?: boolean;
}

export default async function updateEmploymentType({
  id,
  employment_type,
  isActive,
}: Props) {
  return await executeRequest<IEmploymentType>({
    method: "PATCH",
    endpoint: ["employment-type", id.toString()].join("/"),
    body: JSON.stringify({
      employment_type,
      isActive: isActive ? "1" : "0",
    }),
    authenticate: true,
  });
}
