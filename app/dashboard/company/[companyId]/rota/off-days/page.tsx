"use server";
import OffDaysDataTable from "@/app/Components/Rota/OffDaysDataTable";
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
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import OffDaysEditDialog from "@/app/Components/Rota/EditDialog/OffDaysEditDialog";
import { getCompanyData } from "@/app/actions/getCompanyData";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getOffDays } from "@/app/actions/getOffDays";
import OffDaysEditDialogWrapper from "@/app/Components/Rota/EditDialog/OffDaysEditDialog/wrapper";
import { getShifts } from "@/app/actions/getShifts";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function RotaDayOffPage({ params, searchParams }: Props) {
  const company = await getCompanyData(params.companyId);

  const { page, limit } = getPaginationParams(searchParams);

  const paginatedOffDays = await getOffDays({
    company_id: params.companyId,
    page,
    limit,
  });

  const allShifts = await getShifts({
    company_id: params.companyId,
    page: 1,
    limit: -1,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Off Days</p>
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
              <BreadcrumbPage>Off Days</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <OffDaysEditDialog
          shifts={allShifts.data}
          company_id={company.company_id}
        />
      </div>

      <OffDaysDataTable
        data={paginatedOffDays.data.map((item) => ({
          ...item,
          shifts: allShifts.data,
        }))}
      />
    </main>
  );
}
