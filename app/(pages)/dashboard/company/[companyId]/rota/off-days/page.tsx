"use server";
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
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { StaticDataTable } from "@/components/ui/data-table";
import { OffDaysDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/OffDaysDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function RotaDayOffPage({ params, searchParams }: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const sParams = await searchParams;

  const { page, limit } = getPaginationParams(sParams);

  const [company, paginatedOffDays, allShifts] = await Promise.all([
    getCompanyData(companyId),
    getOffDays({
      company_id: companyId,
      page,
      limit,
    }),
    getShifts({
      company_id: companyId,
      page: 1,
      limit: -1,
    }),
  ]);

  if (company.error || paginatedOffDays.error || allShifts.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Off Days</p>
        <ErrorFallbackCard
          error={company.error ?? paginatedOffDays.error ?? allShifts.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Off Days</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Rota"
          title="Off Days"
        />

        <OffDaysEditDialog
          shifts={allShifts.data.data}
          company_id={companyId}
        />
      </div>

      <StaticDataTable
        showOptions={false}
        data={paginatedOffDays.data.data.map((item) => ({
          ...item,
          shifts: allShifts.data.data,
        }))}
        columns={OffDaysDataTableColumns}
      />
    </main>
  );
}
