import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import EmployeesDataTableSkeleton from "@/app/Components/Dashboard/Employee/EmployeesDataTable/skleton";
import ChangeOfCircumstancesDataTableSkeleton from "@/app/Components/Dashboard/Employee/ChangeOfCircumstances/ChangeOfCircumstanecsTable/skeleton";
import ContractAgreementDataTableSkeleton from "@/app/Components/Dashboard/Employee/ContractAgreementTable/skeleton";

export default function EmployeeContractAgreementPageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Company Name</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Employee Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contract Agreement</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* <EmployeeCreationDialog /> */}
      </div>

      {/* Main content, a table of employees */}
      <ContractAgreementDataTableSkeleton />
    </main>
  );
}
