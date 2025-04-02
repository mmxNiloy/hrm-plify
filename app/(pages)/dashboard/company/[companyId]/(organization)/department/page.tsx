"use server";
import { StaticDataTable } from "@/components/ui/data-table";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
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
import SiteConfig from "@/utils/SiteConfig";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
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
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Departments
        </p>

        <ErrorFallbackCard
          error={paginatedDepartments.error ?? company.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Departments
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          title="Designations"
        />
        {writeAccess && (
          <div className="w-full sm:w-auto">
            <DepartmentCreationPopover company_id={companyId} />
          </div>
        )}
      </div>
      <StaticDataTable
        data={paginatedDepartments.data.data.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
        pageCount={paginatedDepartments.data.total_page}
        columns={CompanyDepartmentDataTableColumns}
      />
    </main>
  );
}
