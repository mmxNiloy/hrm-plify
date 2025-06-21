"use server";
import AccessDenied from "@/components/custom/AccessDenied";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { TPermission } from "@/schema/Permissions";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import CompanyListTable from "./features/table/company-list-table";
import CompanyCreationDialog from "./components/company-creation-dialog";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SiteConfig.siteName} | Companies | Super Admin`,
  };
}

export default async function CompanyDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sParams = await searchParams;
  searchParamsCache.parse(searchParams);
  const key = serialize(sParams);

  const user = await getCurrentUser();

  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_mgmt_create");

  if (!readAccess) {
    return <AccessDenied />;
  }

  return (
    <main className="container mx-auto flex flex-col gap-4">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Management
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs title="Company Management" />

        {writeAccess && (
          <CompanyCreationDialog
            asClient={false}
            hasPermission={
              user?.user_roles?.roles?.role_name === "Super Admin" ||
              user?.user_roles?.roles?.role_name === "Admin"
            }
          />
        )}
      </div>

      <Suspense key={key} fallback={<DataTableSkeleton columns={10} />}>
        <CompanyListTable />
      </Suspense>
    </main>
  );
}
