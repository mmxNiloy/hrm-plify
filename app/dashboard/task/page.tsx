"use server";
import CompanyDataTable from "@/app/Components/Company/CompanyDataTable";
import TaskPageCompanyDataTable from "@/app/Components/Dashboard/Task/TaskPageCompanyDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default async function TasksDashboardPage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Tasks Dashboard</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tasks Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TaskPageCompanyDataTable />
    </main>
  );
}
