"use server";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import StaffReportCard from "@/app/Components/Dashboard/Employee/StaffReportCard";
import EmployeeStatsCard from "@/app/Components/Dashboard/Employee/EmployeeStatsCard";
import { cookies } from "next/headers";
import { ICompany } from "@/schema/CompanySchema";

interface Props {
  params: {
    id: number;
  };
}
export default async function EmployeeDashboard({ params }: Props) {
  const sessionId = cookies().get(
    process.env.COOKIE_SESSION_KEY ??
      process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY ??
      "hrmplify_session_cookie"
  );

  const companyRes = await fetch(
    `${process.env.API_BASE_URL!}/companies/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionId!.value}`,
      },
    }
  );

  const company = (await companyRes.json()) as ICompany;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Dashboard</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/company/${params.id}`}>
              {company.company_name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Employee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-2">
        <EmployeeStatsCard />

        <StaffReportCard companyId={params.id} />
      </div>
    </main>
  );
}
