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
import getAllEmploymentTypes from "@/app/(server)/actions/getAllEmploymentTypes";
import ErrorFallbackCard from "../../ErrorFallbackCard";

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

  const [company, companyExtraData, empTypes] = await Promise.all([
    getCompanyData(company_id.toString()),
    getCompanyExtraData(company_id),
    getAllEmploymentTypes(),
  ]);

  if (empTypes.error || companyExtraData.error) {
    return (
      <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Personal Information</p>
        </div>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? empTypes.error}
        />
      </div>
    );
  }

  return (
    <ServiceInformationEditDialog
      company={company.data}
      data={data}
      departments={companyExtraData.data.departments}
      designations={companyExtraData.data.designations}
      employmentTypes={empTypes.data.filter((item) => item.isActive)}
    />
  );
}
