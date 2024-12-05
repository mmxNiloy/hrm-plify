"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import EmployeeStatsCard from "@/components/custom/Dashboard/Employee/EmployeeStatsCard";
import StaffReportCard from "@/components/custom/Dashboard/Employee/StaffReportCard";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";

export default async function EmployeeDashboard({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtra.error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Employee Management Dashboard</p>
        <ErrorFallbackCard error={company.error ?? companyExtra.error} />
      </div>
    );
  }

  return (
    <main className="transition-all container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Management Dashboard</p>
      <MyBreadcrumbs
        company={company.data}
        user={user}
        title="Employee Management"
      />

      <div className="grid lg:grid-cols-2 gap-2">
        <EmployeeStatsCard {...companyExtra.data} />

        <StaffReportCard {...companyExtra.data} />
      </div>
    </main>
  );
}
