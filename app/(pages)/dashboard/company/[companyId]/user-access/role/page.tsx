"use server";
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
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function UserRolePage({ params, searchParams }: Props) {
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { limit, page } = getPaginationParams(await searchParams);

  // TODO: hit the api to get data
  const userConfigData: IEmployeeUserRole[] = []; // Placeholder

  const [company, companyExtraData] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtraData.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Shift Management</p>
        <ErrorFallbackCard error={company.error ?? companyExtraData.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Role Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="User Access"
          title="Role Management"
        />

        <EmployeeUserRoleEditDialog
          company_id={companyId}
          employees={companyExtraData.data.employees}
        />
      </div>

      <StaticDataTable
        data={userConfigData}
        columns={EmployeeUserRoleDataTableColumns}
      />
    </main>
  );
}
