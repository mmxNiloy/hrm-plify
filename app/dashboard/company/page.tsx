"use server";
import { getCompanies } from "@/app/actions/getCompanies";
import CompanyCreationDialog from "@/app/Components/Company/CompanyCreationDialog";
import CompanyDataTable from "@/app/Components/Company/CompanyDataTable";
import { CompanyDataTableColumns } from "@/app/Components/Company/CompanyDataTable/columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";

export default async function CompanyDashboardPage({
  searchParams,
}: ISearchParamsProps) {
  const { limit, page } = getPaginationParams(searchParams);
  const paginatedCompanies = await getCompanies({ page, limit });
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

        <CompanyCreationDialog />
      </div>

      <DataTable
        data={paginatedCompanies.data}
        columns={CompanyDataTableColumns}
        pageCount={paginatedCompanies.total_page}
      />
    </main>
  );
}
