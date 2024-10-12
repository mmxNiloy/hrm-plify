"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getDesignations } from "@/app/(server)/actions/getDesignations";
import DesignationEditPopover from "@/components/custom/Popover/Company/DesignationEditPopover";
import { CompanyDesignationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyDesignationDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function DesignationsPage({
  params,
  searchParams,
}: Props) {
  const { limit, page } = getPaginationParams(searchParams);
  const company = await getCompanyData(params.companyId);
  const designations = await getDesignations({
    company_id: params.companyId,
    page,
    limit,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Designations</p>
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
              <BreadcrumbPage>Designations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <DesignationEditPopover company_id={params.companyId} />
      </div>

      <DataTable
        data={designations}
        columns={CompanyDesignationDataTableColumns}
      />
    </main>
  );
}
