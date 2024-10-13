"use server";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";

export default async function GenerateAttendancePage({
  params,
}: CompanyByIDPageProps) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyDetails(params.companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Generate Attendance</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company,
            title: "Generate Attendance",
            parent: "Attendance Management",
          }}
        />
        {/* <AttendanceFilterPopover {...companyExtraData} /> */}
      </div>

      {/* <StaticDataTable
    data={paginatedAttendance.data}
    columns={AttendanceDataTableColumns}
    pageCount={paginatedAttendance.total_page}
  /> */}
    </main>
  );
}
