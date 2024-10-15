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
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getOffDays } from "@/app/(server)/actions/getOffDays";
import { getShifts } from "@/app/(server)/actions/getShifts";
import OffDaysDataTable from "@/components/custom/DataTable/Rota/OffDaysDataTable";
import OffDaysEditDialog from "@/components/custom/Dialog/Rota/OffDaysEditDialog";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function RotaDayOffPage({ params, searchParams }: Props) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

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
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Rota"
          title="Off Days"
        />

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
