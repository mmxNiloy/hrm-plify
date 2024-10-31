"use server";
import { ICompany, IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import ServiceInformationEditDialog from "./ServiceInformationEditDialog";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";

export default async function ServiceInformationEditDialogWrapper({
  data,
}: {
  data: IEmployeeWithPersonalInfo;
}) {
  const company_id = data.company_id;

  // Get company information
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData] = await Promise.all([
    getCompanyData(company_id),
    getCompanyExtraData(company_id),
  ]);

  return (
    <ServiceInformationEditDialog
      company={company.data}
      data={data}
      departments={companyExtraData.data?.departments ?? []}
      designations={companyExtraData.data?.designations ?? []}
    />
  );
}
