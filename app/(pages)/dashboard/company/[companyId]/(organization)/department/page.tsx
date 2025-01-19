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
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Department`,
  };
}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_dept_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_dept_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_dept_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
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
        {writeAccess && <DepartmentCreationPopover company_id={companyId} />}
      </div>
      <StaticDataTable
        data={paginatedDepartments.data.data.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
        pageCount={paginatedDepartments.data.total_page}
        columns={CompanyDepartmentDataTableColumns}
      />
    </div>
  );
}
