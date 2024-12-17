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
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";

export default async function GenerateAttendancePage({
  params,
}: CompanyByIDPageProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_attend_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_attend_create");
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_attend_update"
  );

  if (!readAccess || !writeAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
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
