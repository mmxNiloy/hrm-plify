"use server";
import executeRequest from "../network/request-builder.service";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface Props {
  id: number;
}

export default async function deleteEmploymentType({ id }: Props) {
  return await executeRequest<IEmploymentType>({
    method: "DELETE",
    endpoint: ["employment-type", id.toString()].join("/"),
    authenticate: true,
  });
}
