"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyData } from "@/app/actions/getCompanyData";
import { DataTable } from "@/components/ui/data-table";
import EmploymentTypeEditPopover from "@/app/Components/Company/EmploymentTypeEditPopover";
import { CompanyEmploymentTypeDataTableColumns } from "@/app/Components/Company/CompanyEmploymentTypeDataTableColumns";

export default async function EmploymentTypePage({
  params,
}: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);

  // TODO: Hit the api and get actual employment types
  const employments: IEmploymentType[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Employment Types</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`..`}>Company Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`.`}
                className="line-clamp-1 text-ellipsis max-w-32"
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Employment Type</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <EmploymentTypeEditPopover company_id={params.companyId} />
      </div>

      <DataTable
        data={employments}
        columns={CompanyEmploymentTypeDataTableColumns}
      />
    </main>
  );
}
