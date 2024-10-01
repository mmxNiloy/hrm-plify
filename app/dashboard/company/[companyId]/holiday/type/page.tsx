"use server";
import ShiftManagementDataTable from "@/app/Components/Rota/ShiftManagementDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICompany } from "@/schema/CompanySchema";
import { IUser, IUserConfig } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import ShiftManagementEditDialog from "@/app/Components/Rota/EditDialog/ShiftManagementEditDialog";
import { getCompanyData } from "@/app/actions/getCompanyData";
import { StaticDataTable } from "@/components/ui/data-table";
import { ShiftsDataTableColumns } from "@/app/Components/Rota/ShiftManagementDataTable/columns";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getShifts } from "@/app/actions/getShifts";
import UserConfigEditDialog from "@/app/Components/UserAccess/EditDialog/UserConfigEditDialog";
import { getCompanyExtraData } from "@/app/actions/getCompanyExtraData";
import { UserConfigDataTableColumns } from "@/app/Components/UserAccess/UserConfigDataTableColumns";
import { IHolidayType } from "@/schema/HolidaySchema";
import HolidayTypeEditPopover from "@/app/Components/Holiday/EditDialog/HolidayTypeEditPopover";
import { HolidayTypeDataTableColumns } from "@/app/Components/Holiday/HolidayTypeDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function HolidayTypesPage({
  params,
  searchParams,
}: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const companyExtraData = await getCompanyExtraData(params.companyId);

  // TODO: hit the api to get data
  const holidayTypes: IHolidayType[] = []; // Placeholder

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
