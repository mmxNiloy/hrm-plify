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
import { StaticDataTable } from "@/components/ui/data-table";
import { TPermission } from "@/schema/Permissions";
import { getPaginationParams } from "@/utils/Misc";
import SiteConfig from "@/utils/SiteConfig";
import { ISearchParamsProps } from "@/utils/Types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SiteConfig.siteName} | Companies | Super Admin`,
  };
}

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
      <main className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Management
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <Breadcrumb>
            <BreadcrumbList className="flex-wrap">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-sm sm:text-base"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm sm:text-base">
                  Company Management
                </BreadcrumbPage>
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
    <main className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Management
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="text-sm sm:text-base"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm sm:text-base">
                Company Management
              </BreadcrumbPage>
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
