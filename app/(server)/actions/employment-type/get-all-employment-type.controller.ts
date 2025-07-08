"use server";
import executeRequest from "../network/request-builder.service";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

export default async function getAllEmploymentTypes(isActive = true) {
  return await executeRequest<IEmploymentType[]>({
    method: "GET",
    endpoint: ["employment-type", "all"].join("/"),
    authenticate: true,
    query: [["isActive", isActive ? "1" : "0"]],
  });
}
