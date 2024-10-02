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
import { IUser } from "@/schema/UserSchema";
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

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function RotaShiftManagementPage({
  params,
  searchParams,
}: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);

  const paginatedShifts = await getShifts({
    company_id: params.companyId,
    page,
    limit,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Shift Management</p>
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
                href={`/dashboard/company/${params.companyId}`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/company/${params.companyId}/rota`}
              >
                Rota
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shift Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ShiftManagementEditDialog company_id={company.company_id} />
      </div>

      <ShiftManagementDataTable data={paginatedShifts.data} />
    </main>
  );
}
