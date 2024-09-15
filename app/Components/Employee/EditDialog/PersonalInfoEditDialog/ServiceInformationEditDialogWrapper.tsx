"use server";
import { ICompany, IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import ServiceInformationEditDialog from "./ServiceInformationEditDialog";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";

export default async function ServiceInformationEditDialogWrapper({
  data,
}: {
  data: IEmployeeWithPersonalInfo;
}) {
  const company_id = data.company_id;

  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  // Find department here
  var departments: IDepartment[] = [];
  var designations: IDesignation[] = [];
  var company: ICompany | undefined = undefined;
  try {
    const dptRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-all-departments/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const dptData = (await dptRes.json()) as IDepartment[];
    departments = dptData;

    const dsgRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-designation/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const dsgData = (await dsgRes.json()) as { data: IDesignation[] };
    designations = dsgData.data;

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/${company_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    company = (await apiRes.json()) as ICompany;
  } catch (err) {
    console.error("Failed to get designations", err);
    departments = [];
    designations = [];
  }

  return (
    <ServiceInformationEditDialog
      company={company}
      data={data}
      departments={departments}
      designations={designations}
    />
  );
}
