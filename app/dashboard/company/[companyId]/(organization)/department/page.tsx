"use server";
import DepartmentCreationPopover from "@/app/Components/Department/DepartmentCreationPopover";
import { StaticDataTable } from "@/components/ui/data-table";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { CompanyDepartmentDataTableColumns } from "@/app/Components/Company/CompanyDepartmentDataTableColumns";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { IDepartment, IPaginatedDepartment } from "@/schema/CompanySchema";
import { getDepartments } from "@/app/actions/getDepartments";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const { page, limit } = getPaginationParams(searchParams);
  var paginatedDepartments: IPaginatedDepartment = await getDepartments({
    company_id: params.companyId,
    page,
    limit,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Company Departments</p>
        <DepartmentCreationPopover company_id={params.companyId} />
      </div>
      <StaticDataTable
        data={paginatedDepartments.data}
        pageCount={paginatedDepartments.total_page}
        columns={CompanyDepartmentDataTableColumns}
      />
    </div>
  );
}
