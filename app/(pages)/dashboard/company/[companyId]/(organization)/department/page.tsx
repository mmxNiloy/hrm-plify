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
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const companyId = (await params).companyId;
  const { page, limit } = getPaginationParams(await searchParams);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [paginatedDepartments, company] = await Promise.all([
    getDepartments({
      company_id: companyId,
      page,
      limit,
    }),
    getCompanyData(companyId),
  ]);

  if (paginatedDepartments.error || company.error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Company Departments</p>

        <ErrorFallbackCard
          error={paginatedDepartments.error ?? company.error}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">Company Departments</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          title="Designations"
        />
        <DepartmentCreationPopover company_id={companyId} />
      </div>
      <StaticDataTable
        data={paginatedDepartments.data.data}
        pageCount={paginatedDepartments.data.total_page}
        columns={CompanyDepartmentDataTableColumns}
      />
    </div>
  );
}
