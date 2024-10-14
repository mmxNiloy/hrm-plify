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

export default async function AllEmployeePage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  var company: ICompany;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/${params.companyId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) redirect("/not-found");
    company = (await apiRes.json()) as ICompany;
  } catch (err) {
    console.error("Failed to fetch company information", err);
    redirect("/not-found");
  }

  // await wait(5000);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <div className="flex items-center justify-between">
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
                href={`/dashboard/company/${params.companyId}/employee`}
              >
                Employee Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Employees</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
