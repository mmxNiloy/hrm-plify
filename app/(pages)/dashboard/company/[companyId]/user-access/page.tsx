"use server";
import React from "react";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { CompanyByIDPageProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getAllSubadmins } from "@/app/(server)/actions/getAllSubadmins";
import { getUserData } from "@/app/(server)/actions/getUserData";
import { getAllPermissions } from "@/app/(server)/actions/getAllPermissions";
import { getCompanyEmployees } from "@/app/(server)/actions/getCompanyEmployees";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import { DataTable } from "@/components/ui/data-table";
import { UserDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function UserAccessDashboardPage({
  params,
  searchParams,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const sParams = await searchParams;

  const { page, limit } = getPaginationParams(sParams);

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

  const [userList, user, permissions, company] = await Promise.all([
    await getCompanyEmployees({ companyId, page, limit }),
    await getUserData(),
    await getAllPermissions(),
    await getCompanyData(companyId),
  ]);

  if (userList.error || permissions.error || company.error || !user) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">System Users</p>
        <ErrorFallbackCard
          error={userList.error ?? permissions.error ?? company.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">System Users</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="User Access Management"
          company={company.data}
          user={user}
        />

        {writeAccess && <UserEditDialog permissions={permissions.data} />}
      </div>
      {/* <DataTable
        data={userList.data.data.map((item) => ({
          ...item.users,
          permissions: permissions.data,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={UserDataTableColumns}
      /> */}
    </main>
  );
}
