"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import EmployeeStatsCard from "@/components/custom/Dashboard/Employee/EmployeeStatsCard";
import StaffReportCard from "@/components/custom/Dashboard/Employee/StaffReportCard";

export default async function EmployeeDashboard({
  params,
}: CompanyByIDPageProps) {
  return (
    <main className="transition-all container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Dashboard</p>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/dashboard/company/${company.company_id}`}
              className="line-clamp-1 text-ellipsis max-w-32"
            >
              {company.company_name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Employee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <div className="grid lg:grid-cols-2 gap-2">
        <EmployeeStatsCard />

        <StaffReportCard companyId={params.companyId} />
      </div>
    </main>
  );
}
