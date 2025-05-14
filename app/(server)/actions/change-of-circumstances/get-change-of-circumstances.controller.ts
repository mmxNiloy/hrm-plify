"use server";

import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import requestAPI from "../request-api.controller";

interface IGetChangeOfCircumstancesProps {
  employeeId: number;
}

interface IChangeOfCircumstancesResponse {
  success: boolean;
  data: IChangeOfCircumstances[];
}

export default async function getChangeOfCircumstances({
  employeeId,
}: IGetChangeOfCircumstancesProps) {
  return await requestAPI<IChangeOfCircumstancesResponse>({
    method: "GET",
    authenticate: true,
    endpoint: [
      "companies",
      "change-of-circumstances",
      "employee",
      employeeId,
    ].join("/"),
  });
}
