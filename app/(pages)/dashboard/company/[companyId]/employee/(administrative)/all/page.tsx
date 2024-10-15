"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import EmployeeOnboardingDialogSkeleton from "@/components/custom/Dialog/Company/EmployeeOnboardingDialog/skeleton";
import EmployeeOnboardingDialogWrapper from "@/components/custom/Dialog/Company/EmployeeOnboardingDialog/wrapper";
import UserDataTable from "@/components/custom/DataTable/Company/UserDataTable";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export default async function AllEmployeePage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  // await wait(5000);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Company Management"
          title="All Employees"
        />

        {/* <EmployeeCreationDialog /> */}
        <Suspense fallback={<EmployeeOnboardingDialogSkeleton />}>
          <EmployeeOnboardingDialogWrapper
            session={session}
            company_id={params.companyId}
          />
        </Suspense>
      </div>

      {/* Main content, a table of employees */}
      <UserDataTable company_id={params.companyId} />
    </main>
  );
}
