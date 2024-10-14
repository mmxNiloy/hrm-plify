"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { IHolidayType } from "@/schema/HolidaySchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getHolidayTypes } from "@/app/(server)/actions/getHolidayTypes";
import HolidayTypeEditPopover from "@/components/custom/Popover/HolidayTypeEditPopover";
import { HolidayTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Holiday/HolidayTypeDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function HolidayTypesPage({
  params,
  searchParams,
}: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);

  const holidayTypes: IHolidayType[] = await getHolidayTypes({
    company_id: params.companyId,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Holiday Types</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href={`../`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`.`}>Holiday Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Holiday Types</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <HolidayTypeEditPopover company_id={company.company_id} />
      </div>

      <StaticDataTable
        data={holidayTypes}
        columns={HolidayTypeDataTableColumns}
      />
    </main>
  );
}
