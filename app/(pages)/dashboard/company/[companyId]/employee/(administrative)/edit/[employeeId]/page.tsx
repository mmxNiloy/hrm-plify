"use server";
import React from "react";
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
import getAllEmploymentTypes from "@/app/(server)/actions/getAllEmploymentTypes";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import { getEmployeeSalaryStructure } from "@/app/(server)/actions/getEmployeeSalaryStructure";
import SalaryStructureFormFragment from "@/components/custom/Form/Fragment/Payroll/SalaryStructureFormFragment";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";

interface Props {
  params: Promise<{
    companyId: string;
    employeeId: string;
  }>;
}

export default async function PersonalInfoSlot({ params }: Props) {
  const [mParams, mCookies, mPermissions] = await Promise.all([
    params,
    cookies(),
    getCurrentUserPermissions(),
  ]);

  const readAccess = mPermissions?.find((item) => item === "cmp_emp_read");
  const writeAccess = mPermissions?.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions?.find((item) => item === "cmp_emp_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  const { employeeId, companyId } = mParams;

  const [
    company,
    companyExtraData,
    personalInfo,
    employmentTypes,
    salaryStructure,
  ] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(Number.parseInt(companyId)),
    getPersonalInfo(Number.parseInt(employeeId)),
    getAllEmploymentTypes(),
    getEmployeeSalaryStructure(Number.parseInt(employeeId)),
  ]);

  if (
    company.error ||
    companyExtraData.error ||
    personalInfo.error ||
    employmentTypes.error ||
    salaryStructure.error
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
            employmentTypes.error ??
            salaryStructure.error
          }
        />
      </div>
    );
  }

  const empTypes = employmentTypes.data.filter((item) => item.isActive);

  return (
    <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Personal Information</p>
        {updateAccess && <EmployeeDetailsEditDialog data={personalInfo.data} />}
      </div>
      <EmployeeDetailsFormFragment data={personalInfo.data} readOnly />

      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Service Information</p>
        {/* <CompanyProfileEditDialog data={data} /> */}
        {updateAccess && (
          <ServiceInformationEditDialog
            company={company.data}
            data={personalInfo.data}
            departments={companyExtraData.data.departments}
            designations={companyExtraData.data.designations}
            employmentTypes={empTypes}
          />
        )}
      </div>
      <ServiceDetailsFormFragment
        data={personalInfo.data}
        employmentTypes={empTypes}
        readOnly
      />

      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Salary Structure</p>
        {/* <CompanyProfileEditDialog data={data} /> */}
        {updateAccess && (
          <SalaryStructureEditDialog
            data={salaryStructure.data.data}
            employees={companyExtraData.data.employees}
            currentEmployee={Number.parseInt(employeeId)}
            company_id={Number.parseInt(companyId)}
          />
        )}
      </div>
      <SalaryStructureFormFragment
        data={salaryStructure.data.data}
        currentEmployee={Number.parseInt(employeeId)}
        employees={companyExtraData.data.employees}
        readOnly
      />
    </div>
  );
}
