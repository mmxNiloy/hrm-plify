"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import EmployeeOnboardingDialog from "@/components/custom/Dialog/Company/EmployeeOnboardingDialog";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import { CompanyUserDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyUserDataTableColumns";
import { getCompanyEmployees } from "@/app/(server)/actions/getCompanyEmployees";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {
  parent?: string;
  readOnly?: boolean;
  showMigrantEmployeesOnly?: boolean;
  title?: string;
  grandParent?: string;
}

export default async function AllEmployeePage({
  params,
  searchParams,
  parent,
  grandParent,
  title,
  readOnly,
  showMigrantEmployeesOnly,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const sParams = await searchParams;
  const { limit, page } = getPaginationParams(sParams);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData, employees] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getCompanyEmployees({ companyId, page, limit, showMigrantEmployeesOnly }),
  ]);

  if (company.error || companyExtraData.error || employees.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">All Employees</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? employees.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          title={title ?? "All Employees"}
          grandParent={grandParent}
        />

        {/* <EmployeeCreationDialog /> */}
        {!readOnly && writeAccess && (
          <EmployeeOnboardingDialog
            company_id={companyId}
            {...companyExtraData.data}
          />
        )}
      </div>

      <StaticDataTable
        data={employees.data.data.map((item) => ({
          ...item,
          readOnly: readOnly || !updateAccess,
        }))}
        columns={CompanyUserDataTableColumns}
        pageCount={employees.data.total_page}
      />
    </main>
  );
}
