"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getSalaryStructure } from "@/app/(server)/actions/getSalaryStructure";
import { SalaryStructureDataTableColumns } from "@/components/custom/DataTable/Columns/Payroll/SalaryStructureDataTableColumns";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getPaginationParams } from "@/utils/Misc";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Salary Structure`,
  };
}

export default async function SalaryStructPage({
  params,
  searchParams,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_payroll_read");
  const writeAccess = mPermissions.find(
    (item) => item === "cmp_payroll_create"
  );
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_payroll_update"
  );

  if (!readAccess) {
    return <AccessDenied />;
  }
  const { page, limit } = getPaginationParams(await searchParams);
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, salaryStructs, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getSalaryStructure({
      company_id: companyId,
      page,
      limit,
    }),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtra.error || salaryStructs.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Salary Structure
        </p>
        <ErrorFallbackCard
          error={company.error ?? companyExtra.error ?? salaryStructs.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Salary Structure
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Payroll"
          title="Salary Structure"
        />

        {writeAccess && (
          <SalaryStructureEditDialog
            company_id={companyId}
            employees={companyExtra.data.employees}
          />
        )}
      </div>

      <StaticDataTable
        columns={SalaryStructureDataTableColumns}
        data={salaryStructs.data.data.map((item) => ({
          ...item,
          companyEmployees: companyExtra.data.employees,
          updateAccess: updateAccess ? true : false,
        }))}
        pageCount={salaryStructs.data.total_page}
      />
    </main>
  );
}
