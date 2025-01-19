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
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import getAllEmploymentTypes from "@/app/(server)/actions/getAllEmploymentTypes";

export default async function PersonalInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_emp_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  // if (!readAccess) {
  //   return <AccessDenied />;
  // }

  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const emp = await getEmployeeData();
  const empId = emp.data?.data?.employee_id ?? 0;

  const [company, companyExtraData, personalInfo, empTypes] = await Promise.all(
    [
      getCompanyData(companyId),
      getCompanyExtraData(companyId),
      getPersonalInfo(empId),
      getAllEmploymentTypes(),
    ]
  );

  if (
    company.error ||
    companyExtraData.error ||
    personalInfo.error ||
    empTypes.error
  ) {
    return (
      <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Personal Information</p>
        </div>
        <ErrorFallbackCard
          error={
            company.error ??
            companyExtraData.error ??
            personalInfo.error ??
            empTypes.error
          }
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Personal Information</p>
        {/* {updateAccess && 
        } */}
        <EmployeeDetailsEditDialog data={personalInfo.data} />
      </div>
      <EmployeeDetailsFormFragment data={personalInfo.data} readOnly />

      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Service Information</p>
        {/* <CompanyProfileEditDialog data={data} /> */}
        {/* {updateAccess && (
        )} */}
        <ServiceInformationEditDialog
          employmentTypes={empTypes.data.filter((item) => item.isActive)}
          company={company.data}
          data={personalInfo.data}
          departments={companyExtraData.data.departments}
          designations={companyExtraData.data.designations}
        />
      </div>
      <ServiceDetailsFormFragment
        employmentTypes={empTypes.data.filter((item) => item.isActive)}
        data={personalInfo.data}
        readOnly
      />
    </div>
  );
}
