"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { Metadata } from "next";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { CompanyByIDPageProps } from "../../../PageProps";
import didAttendToday from "@/app/(server)/actions/didAttendToday";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import AttendanceAlertCard from "@/components/custom/Dashboard/Attendance/AttendanceAlertCard";
import HolidaysCard from "@/components/custom/Dashboard/Leave/HolidaysCard";
import { getHolidays } from "@/app/(server)/actions/getHolidays";
import LeaveRequestsCard from "@/components/custom/Dashboard/Leave/LeaveRequestsCard";
import { getLeaveRequests } from "@/app/(server)/actions/getLeaveRequests";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getFullNameOfUser } from "@/utils/Misc";
import { Label } from "@/components/ui/label";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import EmployeeLeaveStatsCard from "@/components/custom/Dashboard/Employee/EmployeeLeaveStatsCard";
import EmployeeAttendanceStatsCard from "@/components/custom/Dashboard/Employee/EmployeeAttendanceStatsCard";
import EmployeeSalaryStructureCard from "@/components/custom/Dashboard/Employee/EmployeeSalaryStructureCard";
import SiteConfig from "@/utils/SiteConfig";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Employee Dashboard`,
  };
}

export default async function EditEmployeeInfoByUserIdPage({
  params,
}: CompanyByIDPageProps) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [
    company,
    // attendance,
    holidays,
    employeeData,
    leaveRequests,
    leaveTypes,
  ] = await Promise.all([
    getCompanyData(companyId),
    // didAttendToday(),
    getHolidays({ company_id: Number.parseInt(companyId) }),
    getEmployeeData(),
    getLeaveRequests({
      company_id: Number.parseInt(companyId),
      page: 1,
      limit: 10,
    }),
    getCompanyLeaveTypes({
      company_id: Number.parseInt(companyId),
      page: 1,
      limit: 10,
    }),
  ]);

  if (
    company.error ||
    holidays.error ||
    leaveRequests.error ||
    employeeData.error
  ) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Employee Dashboard
        </p>
        <ErrorFallbackCard
          error={
            company.error ??
            holidays.error ??
            leaveRequests.error ??
            employeeData.error
          }
        />
      </main>
    );
  }
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      {/* <AttendanceAlert attendanceResponse={attendance} /> */}
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">Dashboard</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs title={`${getFullNameOfUser(user)}'s Dashboard`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4">
        {/* Profile Summary here */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              Profile
              <Link href={"profile"} passHref>
                <Button variant={"link"}>
                  See Details <Icons.chevronRight />{" "}
                </Button>
              </Link>
            </CardTitle>
            <CardDescription className="sr-only">
              Summary of your profile.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <AvatarPicker
              readOnly
              src={employeeData.data.data?.image}
              className="row-span-4 size-full"
            />

            <div className="flex flex-col gap-2">
              <Label>Full Name</Label>
              <Input readOnly value={getFullNameOfUser(user)} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Company</Label>
              <Input readOnly value={company.data.company_name} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Designation</Label>
              <Input
                readOnly
                placeholder="Designation"
                value={employeeData.data.data?.designations?.designation_name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Department</Label>
              <Input
                readOnly
                value={employeeData.data.data?.departments?.dpt_name}
                placeholder="Department"
              />
            </div>
          </CardContent>
        </Card>
        {/* Employee Attendance Alert */}
        <AttendanceAlertCard />
        {/* Employee Statistics here */}
        <EmployeeSalaryStructureCard
          employeeID={employeeData.data.data?.employee_id ?? 0}
        />
        <EmployeeLeaveStatsCard />

        <EmployeeAttendanceStatsCard />

        {/* Holiday Calendar */}
        <HolidaysCard holidays={holidays.data} />
        {/* Leave requests card */}
        <LeaveRequestsCard
          leaveRequests={leaveRequests.data.data
            .filter((item) => {
              if (employeeData.data.data?.leave_approvers) return true;
              return item.employee_id == employeeData.data.data?.employee_id;
            })
            .map((item) => ({
              ...item,
              company_leave_types: leaveTypes.data,
              can_edit: false,
              currentEmployee: employeeData.data.data,
            }))}
        />
      </div>
    </main>
  );
}
