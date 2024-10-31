"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import AttendanceGenerationTable from "@/components/custom/Dashboard/Attendance/AttendanceGenerationTable";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function GenerateAttendancePage({
  params,
}: CompanyByIDPageProps) {
  const companyId = (await params).companyId;
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
        <p className="text-xl font-semibold">Generate Attendance</p>
        <ErrorFallbackCard error={company.error ?? companyExtraData.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Generate Attendance</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company: company.data,
            title: "Generate Attendance",
            parent: "Attendance Management",
          }}
        />
        {/* <AttendanceFilterPopover {...companyExtraData} /> */}
      </div>
      <div className="flex flex-col gap-4">
        <AttendanceGenerationTable
          employees={companyExtraData.data.employees}
          companyId={companyId}
        />
      </div>
    </main>
  );
}
