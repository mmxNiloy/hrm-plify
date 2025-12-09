"use server";
import executeRequest from "../network/request-builder.service";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface Props {
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export default async function getEmploymentType({
  page = 1,
  limit = 10,
  isActive = true,
}: Props) {
  return await executeRequest<IEmploymentType[]>({
    method: "GET",
    endpoint: "employment-type",
    authenticate: true,
    query: {
      page,
      limit,
      isActive: isActive ? 1 : 0,
    },
  });
}
