import EmployeesDataTable from "@/app/Components/Dashboard/Employee/EmployeesDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IEmployee } from "@/schema/EmployeeSchema";
import React from "react";

export default function AllEmployeePage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/employee">
              Employee Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main content, a table of employees */}
      <EmployeesDataTable />

      {/* Fab to add a new employee */}
      <Button
        size={"sm"}
        className="left-auto right-8 top-auto bottom-8 fixed rounded-full bg-blue-500 hover:bg-blue-400 gap-1"
      >
        <Icons.plus /> Add Employee
      </Button>
    </main>
  );
}
