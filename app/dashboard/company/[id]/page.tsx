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

interface Props {
  params: {
    id: number;
  };
}

export default async function CompanyByIDPage({ params }: Props) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const companyRes = await fetch(
    `https://artemis-production.up.railway.app/api/my-company/details/${params.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const company = (await companyRes.json()) as ICompanyDetails;

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
              <BreadcrumbLink href="/dashboard/company">
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
