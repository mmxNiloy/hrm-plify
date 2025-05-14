"use server";

import { flattenObject } from "@/utils/flattenObject";
import requestAPI from "../request-api.controller";

interface ICreateChangeOfCircumstancesProps {
  employee_id: number;
  newValue: Record<string, any>;
  oldValue: Record<string, any>;
}

type TCreateChangeOfCircumstancesResponseProps =
  | {
      message: string;
      updated: boolean;
      data: undefined;
    }
  | {
      message: string;
      updated: boolean;
      data: Record<string, any>;
    };

export default async function createChangeOfCircumstances({
  employee_id,
  newValue,
  oldValue,
}: ICreateChangeOfCircumstancesProps) {
  console.debug("Trying to change circumstances...");
  return await requestAPI<TCreateChangeOfCircumstancesResponseProps>({
    endpoint: ["companies", "change-of-circumstances", "add", employee_id].join(
      "/"
    ),
    method: "POST",
    authenticate: true,
    body: JSON.stringify({
      old: flattenObject(oldValue),
      new: flattenObject(newValue),
    }),
  });
}
