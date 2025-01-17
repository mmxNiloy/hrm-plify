"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import EmployeeOnboardingDialog from "@/components/custom/Dialog/Company/EmployeeOnboardingDialog";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import { CompanyUserDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyUserDataTableColumns";
import { getCompanyEmployees } from "@/app/(server)/actions/getCompanyEmployees";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import EmployeeOnboardingDialogWrapper from "@/components/custom/Dialog/Company/EmployeeOnboardingDialog/wrapper";
import Icons from "@/components/ui/icons";
import Link from "next/link";
import Counter from "@/components/custom/Counter";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Employee Dashboard`,
  };
}

export default async function EmployeeDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtraData.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Employee Dashboard</p>
        <ErrorFallbackCard error={company.error ?? companyExtraData.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Dashboard</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          title={"Employee Dashboard"}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 justify-items-center *:min-w-64">
        <Link href={"./employee/all"}>
          <div className="flex flex-col gap-2 p-4 rounded-md from-teal-500/80 to-indigo-600 hover:from-sky-400/80 hover:to-indigo-500 bg-gradient-to-br text-white">
            <div className="flex gap-2 text-xl font-semibold">
              <Icons.employees />
              Active Employees
            </div>
            <Counter
              value={companyExtraData.data.employees.length}
              className="text-end"
            />
          </div>
        </Link>
        <Link href={"./employee/migrant"}>
          <div className="flex flex-col gap-2 p-4 rounded-md from-lime-500/80 to-emerald-600 hover:from-lime-400/80 hover:to-emerald-500 bg-gradient-to-br text-white">
            <div className="flex gap-2 text-xl font-semibold">
              <Icons.users />
              Migrant Employees
            </div>
            <Counter
              value={
                companyExtraData.data.employees.filter(
                  (item) => item.is_foreign
                ).length
              }
              className="text-end"
            />
          </div>
        </Link>
        <Link href={"./employee/staff-report"}>
          <div className="flex flex-col h-full gap-2 p-4 rounded-md from-rose-500/80 to-amber-600 hover:rose-lime-400/80 hover:to-amber-500 bg-gradient-to-br text-white">
            <div className="flex gap-2 text-xl font-semibold">
              <Icons.files />
              Staff Report
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
