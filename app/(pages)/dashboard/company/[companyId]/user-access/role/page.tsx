"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IEmployeeUserRole, IUser } from "@/schema/UserSchema";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import EmployeeUserRoleEditDialog from "@/components/custom/Dialog/UserAccess/EmployeeUserRoleEditDialog";
import { EmployeeUserRoleDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/EmployeeUserRoleDataTableColumns";
import { cookies } from "next/headers";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function UserRolePage({ params, searchParams }: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const companyExtraData = await getCompanyExtraData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  // TODO: hit the api to get data
  const userConfigData: IEmployeeUserRole[] = []; // Placeholder

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Role Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="User Access"
          title="Role Management"
        />

        <EmployeeUserRoleEditDialog
          company_id={company.company_id}
          employees={companyExtraData.employees}
        />
      </div>

      <StaticDataTable
        data={userConfigData}
        columns={EmployeeUserRoleDataTableColumns}
      />
    </main>
  );
}
