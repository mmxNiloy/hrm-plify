"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import EmployeeDetailsEditDialog from "@/components/custom/Dialog/Employee/EmployeeDetailsEditDialog";
import EmployeeDetailsFormFragment from "@/components/custom/Form/Fragment/Employee/EmployeeDetailsFormFragment";
import ServiceDetailsFormFragment from "@/components/custom/Form/Fragment/Employee/ServiceDetailsFormFragment";
import { getPersonalInfo } from "@/app/(server)/actions/employee/getPersonalInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import ServiceInformationEditDialog from "@/components/custom/Dialog/Employee/ServiceInformationEditDialog";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

export default async function PersonalInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData, personalInfo] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getPersonalInfo(employeeId),
  ]);

  if (company.error || companyExtraData.error || personalInfo.error) {
    return (
      <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Personal Information</p>
        </div>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? personalInfo.error}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Personal Information</p>
        <EmployeeDetailsEditDialog data={personalInfo.data} />
      </div>
      <EmployeeDetailsFormFragment data={personalInfo.data} readOnly />

      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Service Information</p>
        {/* <CompanyProfileEditDialog data={data} /> */}
        <ServiceInformationEditDialog
          company={company.data}
          data={personalInfo.data}
          departments={companyExtraData.data.departments}
          designations={companyExtraData.data.designations}
        />
      </div>
      <ServiceDetailsFormFragment data={personalInfo.data} readOnly />
    </div>
  );
}
