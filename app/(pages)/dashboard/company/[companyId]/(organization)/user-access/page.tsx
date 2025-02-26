"use server";
import React from "react";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getUserData } from "@/app/(server)/actions/getUserData";
import { getAllPermissions } from "@/app/(server)/actions/getAllPermissions";
import { ISearchParamsProps } from "@/utils/Types";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import { getCompanyEmployeesWithPermissions } from "@/app/(server)/actions/getCompanyEmployeesWithPermissions";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { UserDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserDataTableColumns";
import { EmployeeDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/EmployeeDataTableColumns";

interface Props extends CompanyByIDPageProps {}

export default async function UserAccessDashboardPage({ params }: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "sys_user_read");
  const writeAccess = mPermissions.find((item) => item === "sys_user_create");
  const updateAccess = mPermissions.find((item) => item === "sys_user_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  const [empList, user, permissions, company] = await Promise.all([
    await getCompanyEmployeesWithPermissions(companyId),
    await getUserData(),
    await getAllPermissions(),
    await getCompanyData(companyId),
  ]);

  if (empList.error || permissions.error || company.error || !user) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Employee Access Management</p>
        <ErrorFallbackCard
          error={empList.error ?? permissions.error ?? company.error}
        />
      </main>
    );
  }

  const allPerms = permissions.data.filter(
    (item) =>
      !item.permission_name.startsWith("cmp_mgmt") &&
      !item.permission_name.includes("admin") &&
      item.permission_name.startsWith("cmp")
  );

  const employees = empList.data.employees.map((item) => {
    // Find the permissions of this user
    const permission = empList.data.employeePermissions.filter(
      (perm) => perm.user_id == item.user_id
    );

    return {
      data: item,
      permission,
      permissions: allPerms,
      updateAccess: updateAccess ? true : false,
    };
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Access Management </p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="Employee Access Management"
          company={company.data}
          user={user}
        />
      </div>
      <DataTable data={employees} columns={EmployeeDataTableColumns} />
    </main>
  );
}
