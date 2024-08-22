import EmployeesDataTable from "@/app/Components/Dashboard/Employee/EmployeesDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Icons from "@/components/ui/icons";
import React from "react";
import { Button } from "@/components/ui/button";
import ContractAgreementTable from "@/app/Components/Dashboard/Employee/ContractAgreementTable";

export default function ContactAgreementPage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Contract Agreement</p>
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
              <BreadcrumbPage>Contract Agreement</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main content, a table of employees */}
      <ContractAgreementTable />
    </main>
  );
}
