"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import AccessDenied from "@/components/custom/AccessDenied";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import SystemUserTable from "./features/system-user-table";
import getSiteMetadata from "@/app/(server)/actions/site/get-site-metadata.controller";

export async function generateMetadata(): Promise<Metadata> {
  return await getSiteMetadata("System Users");
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
