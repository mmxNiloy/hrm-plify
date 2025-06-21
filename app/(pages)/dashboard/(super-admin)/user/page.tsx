"use server";

import { getAllPermissions } from "@/app/(server)/actions/getAllPermissions";
import { getAllSubadmins } from "@/app/(server)/actions/getAllSubadmins";
import { getUserData } from "@/app/(server)/actions/getUserData";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import AccessDenied from "@/components/custom/AccessDenied";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { UserDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserDataTableColumns";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { DataTable } from "@/components/ui/data-table";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import SystemUserTable from "./features/system-user-table";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SiteConfig.title.sysUsers,
  };
}

export default async function UserListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [sParams, perms] = await Promise.all([
    searchParams,
    getCurrentUserPermissions(),
  ]);

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  const readAccess = perms?.find((item) => item === "sys_user_read");

  if (!readAccess) {
    return <AccessDenied />;
  }

  return (
    <Suspense key={key} fallback={<DataTableSkeleton columns={9} rows={10} />}>
      <SystemUserTable />
    </Suspense>
  );
}
