import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import HolidaysCard from "@/app/Components/Dashboard/Leave/HolidaysCard";
import LeaveBalanceCard from "@/app/Components/Dashboard/Leave/LeaveBalanceCard";
import { IEmployeeLeave, ILeaveBalance } from "@/schema/LeaveSchema";
import LeaveCountBarChart from "@/app/Components/Dashboard/Leave/Stats/LeaveCountBarChart";
import LeaveTypesDataTable from "@/app/Components/Dashboard/Leave/LeaveTypesDataTable";

export default function LeavePage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Management Dashboard</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Show a summary of leaves in a card or something */}
      <div className="grid grid-cols-2 gap-4">
        <HolidaysCard />

        {/* Leave balance */}
        <LeaveBalanceCard
          data={Array.from({ length: 3 }, (_: ILeaveBalance, index) => ({
            employee_id: index + 1,
            employee_name: `Example Employee #${index + 1}`,
            designation: "Example Designation",
            leaves: Array.from({ length: 3 }, (_: IEmployeeLeave, idx) => ({
              employee_id: index,
              leave_type: `Example Leave Type #${idx}`,
              total: 10 + idx * 5,
              leave_taken: 2 + idx * 3,
            })),
          }))}
        />

        {/* Current leave types */}
        <div className="px-8 py-4">
          <p className="text-lg mb-4 font-semibold">Leave Types</p>
          <LeaveTypesDataTable />
        </div>

        {/* Leave Stats */}
        <LeaveCountBarChart />
      </div>
    </main>
  );
}
