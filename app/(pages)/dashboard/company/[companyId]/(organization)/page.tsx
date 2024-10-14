"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICompanyDetails } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import CompanyDetailTabs from "@/components/custom/Tabs/CompanyDetailTabs";

export default async function CompanyByIDPage({
  params,
}: CompanyByIDPageProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var company: ICompanyDetails = await getCompanyDetails(params.companyId);

  // Guard unauthorized access
  if (
    user.user_roles?.roles.role_name !== "Super Admin" &&
    user.user_roles?.roles.role_name !== "Admin" &&
    user.usercompany?.company_id != Number.parseInt(`${params.companyId}`)
  ) {
    redirect(
      `/dashboard/company/${user.usercompany?.company_id}/?_ref=unauthorized-access`
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Details</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/company/">
                Company Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate w-64">
                {company.company_name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* {user.user_roles.roles.role_name !== "Employee" && (
          <CompanyEditDialog data={company} />
        )} */}
      </div>

      <CompanyDetailTabs company={company} />

      {/* Empty space at the bottom */}
      <span className="h-1" />
    </main>
  );
}
