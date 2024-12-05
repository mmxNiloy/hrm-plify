"use server";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import EmployeesDataTable from "@/components/custom/DataTable/Company/Employee/EmployeesDataTable";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function MigrantEmployeePage({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  // Get company information
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Migrant Employees</p>
        <ErrorFallbackCard error={company.error} />
      </div>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Migrant Employees</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Employee Management"
          title="Migrant Employees"
        />

        <Button
          size={"sm"}
          className="hidden text-white rounded-full bg-blue-500 hover:bg-blue-400 gap-1"
        >
          <Icons.plus /> Add Employee
        </Button>
      </div>

      {/* Main content, a table of employees */}
      <EmployeesDataTable />
    </main>
  );
}
