"use server";

import CompanyDetailTabs from "@/app/Components/Company/CompanyDetailTabs";

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
import { CompanyByIDPageProps } from "./PageProps";
import { redirect } from "next/navigation";

export default async function CompanyByIDPage({
  params,
}: CompanyByIDPageProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var company: ICompanyDetails;

  try {
    const companyRes = await fetch(
      `${process.env.API_BASE_URL}/my-company/details/${params.companyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!companyRes.ok) {
      redirect("/not-found");
    }

    company = (await companyRes.json()) as ICompanyDetails;
  } catch (err) {
    console.error("Failed to fetch company information", err);
    redirect("/not-found");
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
