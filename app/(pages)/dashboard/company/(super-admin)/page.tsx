"use server";
import { getCompanies } from "@/app/(server)/actions/getCompanies";
import AccessDenied from "@/components/custom/AccessDenied";
import { CompanyDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyDataTableColumns";
import CompanyCreationDialog from "@/components/custom/Dialog/Company/CompanyCreationDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { TPermission } from "@/schema/Permissions";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import React from "react";

export default async function CompanyDashboardPage({
  searchParams,
}: ISearchParamsProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_mgmt_create");

  if (!readAccess) {
    return <AccessDenied />;
  }

  const { limit, page } = getPaginationParams(await searchParams);
  const { data: paginatedCompanies, error } = await getCompanies({
    page,
    limit,
  });
  if (error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Management</p>
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Company Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <ErrorFallbackCard error={error} />
      </main>
    );
  }

  console.log("Super Admin > Companies > ", paginatedCompanies);
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Management</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Company Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {writeAccess && <CompanyCreationDialog asClient={false} />}
      </div>

      <StaticDataTable
        data={paginatedCompanies.data}
        columns={CompanyDataTableColumns}
        pageCount={paginatedCompanies.total_page}
      />
    </main>
  );
}
