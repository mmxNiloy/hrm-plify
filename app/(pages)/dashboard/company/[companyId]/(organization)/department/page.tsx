"use server";
import { StaticDataTable } from "@/components/ui/data-table";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { IPaginatedDepartment } from "@/schema/CompanySchema";
import { getDepartments } from "@/app/(server)/actions/getDepartments";
import DepartmentCreationPopover from "@/components/custom/Popover/Department/DepartmentCreationPopover";
import { CompanyDepartmentDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyDepartmentDataTableColumns";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const { page, limit } = getPaginationParams(searchParams);
  var paginatedDepartments: IPaginatedDepartment = await getDepartments({
    company_id: params.companyId,
    page,
    limit,
  });
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const company = await getCompanyData(params.companyId);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">Company Departments</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company} user={user} title="Designations" />
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
