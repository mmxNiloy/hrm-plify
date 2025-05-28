"use server";

import { getAllPermissions } from "@/app/(server)/actions/getAllPermissions";
import { getAllSubadmins } from "@/app/(server)/actions/getAllSubadmins";
import { getUserData } from "@/app/(server)/actions/getUserData";
import AccessDenied from "@/components/custom/AccessDenied";
import { UserDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserDataTableColumns";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { TPermission } from "@/schema/Permissions";
import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SiteConfig.appName} | System Users | Super Admin`,
  };
}

export default async function UserListPage() {
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

  const [userList, user, permissions] = await Promise.all([
    await getAllSubadmins(),
    await getUserData(),
    await getAllPermissions(),
  ]);

  if (userList.error || permissions.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          System Users
        </p>
        <ErrorFallbackCard error={userList.error ?? permissions.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        System Users
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm sm:text-base">
            <BreadcrumbLink href=".">Dashboard</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbPage>System Users</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {writeAccess && (
          <div className="w-full sm:w-auto">
            <UserEditDialog permissions={permissions.data} />
          </div>
        )}
      </div>
      <DataTable
        data={userList.data.map((item) => ({
          ...item,
          permissions: permissions.data,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={UserDataTableColumns}
      />
    </main>
  );
}
