"use server";
import { getAllPermissions } from "@/app/(server)/actions/getAllPermissions";
import { getAllSubadmins } from "@/app/(server)/actions/getAllSubadmins";
import { getUserData } from "@/app/(server)/actions/getUserData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { UserDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserDataTableColumns";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import React from "react";

export default async function UserListPage() {
  const [userList, user, permissions] = await Promise.all([
    await getAllSubadmins(),
    await getUserData(),
    await getAllPermissions(),
  ]);

  if (userList.error || permissions.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">System Users</p>
        <ErrorFallbackCard error={userList.error ?? permissions.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">System Users</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink href=".">Dashboard</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbPage>System Users</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {user?.user_roles?.roles.role_name === "Super Admin" && (
          <UserEditDialog permissions={permissions.data} />
        )}
      </div>
      <DataTable
        data={userList.data.map((item) => ({
          ...item,
          permissions: permissions.data,
        }))}
        columns={UserDataTableColumns}
      />
    </main>
  );
}
