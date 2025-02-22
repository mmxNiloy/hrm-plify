"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import AttendanceBulkUpdateDialog from "@/components/custom/Dialog/Company/AttendanceBulkUpdateDialog";
import { StaticDataTable } from "@/components/ui/data-table";
import { AttendanceGenerationRecordDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceGenerationRecordDataTableColumns";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getAttendanceOfEmployee } from "@/app/(server)/actions/getAttendanceOfEmployee";
import AttendancePDFGenerator from "@/components/custom/Dashboard/Attendance/AttendancePDFGenerator";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Generate Attendance`,
  };
}

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function GenerateAttendancePage({
  params,
  searchParams,
}: Props) {
  const [sParams, mCookies, mParams] = await Promise.all([
    searchParams,
    cookies(),
    params,
  ]);

  const employeeId = Number.parseInt(
    (sParams["employeeId"] as string | undefined) ?? "0"
  );
  const sort = (sParams["sort"] as "ASC" | "DESC" | undefined) ?? "DESC";
  const { limit, page } = getPaginationParams(sParams);

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

  var companyId = mParams.companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const [company, companyExtraData, attendance] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getAttendanceOfEmployee({ employeeId, limit, page, sort }),
  ]);

  if (company.error || companyExtraData.error || attendance.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Generate Attendance</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? attendance.error}
        />
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
        <div className="flex gap-4">
          <AttendanceBulkUpdateDialog
            asGenerator
            company_id={companyId}
            employees={companyExtraData.data.employees}
          />

          <AttendancePDFGenerator
            company={company.data}
            employee={companyExtraData.data.employees.find(
              (item) => item.employee_id == employeeId
            )}
            data={attendance.data.data}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <StaticDataTable
          // showOptions={false}
          data={attendance.data.data.map((item) => ({
            ...item,
            employee: companyExtraData.data.employees.find(
              (emp) => emp.employee_id == employeeId
            ),
            employee_id: employeeId,
            company_id: companyId,
          }))}
          pageCount={attendance.data.total_page}
          columns={AttendanceGenerationRecordDataTableColumns}
        />
      </div>
    </main>
  );
}
