import ChangeOfCircumstancesCreationDialog from "@/app/Components/Dashboard/Employee/ChangeOfCircumstances/ChangeOfCircumstancesCreationDialog";
import ChangeOfCircumstancesTable from "@/app/Components/Dashboard/Employee/ChangeOfCircumstances/ChangeOfCircumstanecsTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import React from "react";

export default function ChangeOfCircumstancesPage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Change of Circumstances</p>
      <div className="flex items-center justify-between">
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
              <BreadcrumbPage>Change of Circumstances</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ChangeOfCircumstancesCreationDialog />
      </div>

      <ChangeOfCircumstancesTable />
    </main>
  );
}
