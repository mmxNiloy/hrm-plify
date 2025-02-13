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

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Employee Dashboard`,
  };
}

export default async function EditEmployeeInfoByUserIdPage({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
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
    getHolidays({ company_id: companyId }),
    getEmployeeData(),
    getLeaveRequests({
      company_id: companyId,
      page: 1,
      limit: 10,
    }),
    getCompanyLeaveTypes({ company_id: companyId, page: 1, limit: 10 }),
  ]);

  if (
    company.error ||
    holidays.error ||
    leaveRequests.error ||
    employeeData.error
  ) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Employee Dashboard</p>
        <ErrorFallbackCard
          error={
            company.error ??
            holidays.error ??
            leaveRequests.error ??
            employeeData.error
          }
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {/* <AttendanceAlert attendanceResponse={attendance} /> */}
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title={`${getFullNameOfUser(user)}'s Dashboard`}
          user={user}
          company={company.data}
        />
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

          <CardContent className="grid grid-cols-2 gap-2">
            <AvatarPicker
              readOnly
              src={employeeData.data.data?.image}
              className="row-span-4"
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
    </div>
  );
}
