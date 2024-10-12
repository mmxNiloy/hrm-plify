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
  const company = await getCompanyData(params.companyId);

  const { page, limit } = getPaginationParams(searchParams);
  const filters = getFilters(searchParams);

  const paginatedDutyRoster = await getDutyRosters({
    company_id: company.company_id,
    page,
    limit,
    filters,
  });

  const companyExtraData = await getCompanyExtraData(params.companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Duty Roster</p>
      <div className="flex items-center justify-between gap-2">
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
              <BreadcrumbPage>Duty Roster</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <span className="flex-grow" />
        <form
          method="POST"
          action={`/api/rota/duty-roster/report/pdf`}
          target="_blank"
        >
          <input
            className="hidden"
            readOnly
            value={params.companyId}
            name="company_id"
          />
          <input
            className="hidden"
            readOnly
            value={filters.employee_id}
            name="employee_id"
          />
          <input
            className="hidden"
            readOnly
            value={filters.from_date}
            name="from_date"
          />
          <input
            className="hidden"
            readOnly
            value={filters.end_date}
            name="end_date"
          />
          <input
            className="hidden"
            readOnly
            value={filters.department_id}
            name="department_id"
          />
          <input
            className="hidden"
            readOnly
            value={filters.shift_id}
            name="shift_id"
          />

          <Button
            className="bg-rose-500 hover:bg-rose-400 text-white rounded-full gap-2"
            size="sm"
          >
            <Icons.pdf className="stroke-white fill-white" /> Download as PDF
            File
          </Button>
        </form>
        <Button className={ButtonSuccess} size="sm">
          <Icons.excel className="stroke-white fill-white" /> Download as Excel
          File
        </Button>
      </div>
      <div className="flex items-center justify-end gap-2 mt-2 mb-2">
        {/* Duty Roster Filter */}
        <DutyRosterFilterDialog {...companyExtraData} />

        <span className="flex-grow"></span>
        <DutyRosterEditDialog
          company_id={params.companyId}
          {...companyExtraData}
          type="employee"
        />
        {/* <DutyRosterEditDialog type="designation" /> */}
      </div>

      <DutyRosterDataTable
        data={paginatedDutyRoster.data.map((item) => ({
          ...item,
          company_shifts: companyExtraData.shifts,
          company_departments: companyExtraData.departments,
          company_employees: companyExtraData.employees,
        }))}
      />
    </main>
  );
}
