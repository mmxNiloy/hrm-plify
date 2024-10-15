"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import EmployeeStatsCard from "@/components/custom/Dashboard/Employee/EmployeeStatsCard";
import StaffReportCard from "@/components/custom/Dashboard/Employee/StaffReportCard";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";

export default async function EmployeeDashboard({
  params,
}: CompanyByIDPageProps) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const company = await getCompanyData(params.companyId);

  return (
    <main className="transition-all container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Management Dashboard</p>
      <MyBreadcrumbs
        company={company}
        user={user}
        title="Employee Management"
      />

      <div className="grid lg:grid-cols-2 gap-2">
        <EmployeeStatsCard />

        <StaffReportCard companyId={params.companyId} />
      </div>
    </main>
  );
}
