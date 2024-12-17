"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { Button } from "@/components/ui/button";
import { ButtonSuccess } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getDutyRosters } from "@/app/(server)/actions/getDutyRosters";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import DutyRosterFilterDialog from "@/components/custom/Dialog/Rota/DutyRosterFilterDialog";
import DutyRosterEditDialog from "@/components/custom/Dialog/Rota/DutyRosterEditDialog";
import DutyRosterDataTable from "@/components/custom/DataTable/Rota/DutyRosterDataTable";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { DataTable } from "@/components/ui/data-table";
import { DutyRosterDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/DutyRosterDataTableColumns";
import DutyRosterReportGenerator from "@/components/custom/PDF/DutyRosterReportGenerator";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(searchParams: ISearchParams) {
  const { department_id, shift_id, employee_id, from_date, end_date } =
    searchParams;
  return {
    department_id: department_id
      ? Number.parseInt(department_id as string)
      : undefined,
    shift_id: shift_id ? Number.parseInt(shift_id as string) : undefined,
    employee_id: employee_id
      ? Number.parseInt(employee_id as string)
      : undefined,
    from_date: from_date as string | undefined,
    end_date: end_date as string | undefined,
  };
}

export default async function RotaDutyRosterPage({
  params,
  searchParams,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_rota_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_rota_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_rota_update");

  if (!readAccess) {
    return <AccessDenied />;
  }
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const sParams = await searchParams;
  const filters = getFilters(sParams);
  const { page, limit } = getPaginationParams(sParams);

  const [company, companyExtraData, paginatedDutyRoster] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getDutyRosters({
      company_id: companyId,
      page,
      limit,
      filters,
    }),
  ]);

  if (company.error || companyExtraData.error || paginatedDutyRoster.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Duty Roster</p>
        <ErrorFallbackCard
          error={
            company.error ?? companyExtraData.error ?? paginatedDutyRoster.error
          }
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Duty Roster</p>
      <div className="flex items-center justify-between gap-2">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Rota"
          title="Duty Roster"
        />

        <span className="flex-grow" />

        <DutyRosterReportGenerator
          company={company.data}
          reports={paginatedDutyRoster.data.data}
        />
      </div>
      <div className="flex items-center justify-end gap-2 mt-2 mb-2">
        {/* Duty Roster Filter */}
        <DutyRosterFilterDialog {...companyExtraData.data} />

        <span className="flex-grow"></span>
        {writeAccess && (
          <DutyRosterEditDialog
            company_id={companyId}
            {...companyExtraData.data}
            type="employee"
          />
        )}
        {/* <DutyRosterEditDialog type="designation" /> */}
      </div>

      <DataTable
        columns={DutyRosterDataTableColumns}
        data={paginatedDutyRoster.data.data.map((item) => ({
          ...item,
          company_shifts: companyExtraData.data.shifts,
          company_departments: companyExtraData.data.departments,
          company_employees: companyExtraData.data.employees,
          updateAccess: updateAccess ? true : false,
        }))}
      />
    </main>
  );
}
