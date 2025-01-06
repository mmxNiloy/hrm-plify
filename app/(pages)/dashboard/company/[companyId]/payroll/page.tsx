"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getSalaryStructure } from "@/app/(server)/actions/getSalaryStructure";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import PayrollEditDialog from "@/components/custom/Dialog/Payroll/PayrollEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getFullNameOfEmployee, getPaginationParams } from "@/utils/Misc";
import { DataTable } from "@/components/ui/data-table";
import { PayrollDataTableColumns } from "@/components/custom/DataTable/Columns/Payroll/PayrollDataTableColumns";
import { Button } from "@/components/ui/button";
import { ButtonSuccess } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { getPayroll } from "@/app/(server)/actions/getPayroll";
import { MonthPicker } from "@/components/custom/DatePicker/MonthPicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Payroll Management`,
  };
}

export default async function PayRollManagementPage({
  params,
  searchParams,
}: Props) {
  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);
  const selectedEmployee = sParams.employee as string | undefined;
  const selectedDate = sParams.pay_period as string | undefined;

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, salaryStructs, companyExtra, payroll] = await Promise.all([
    getCompanyData(companyId),
    getSalaryStructure({
      company_id: companyId,
      page,
      limit,
    }),
    getCompanyExtraData(companyId),
    getPayroll({
      company_id: companyId,
      employee_id: selectedEmployee,
      pay_period: selectedDate,
    }),
  ]);

  if (
    company.error ||
    companyExtra.error ||
    salaryStructs.error ||
    payroll.error
  ) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payroll</p>
        <ErrorFallbackCard
          error={
            company.error ??
            companyExtra.error ??
            salaryStructs.error ??
            payroll.error
          }
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Payroll</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company.data} user={user} title="Payroll" />

        <PayrollEditDialog
          company_id={companyId}
          employees={companyExtra.data.employees}
          departments={companyExtra.data.departments}
          designations={companyExtra.data.designations}
        />
      </div>

      <form className="grid grid-cols-3 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label>Employee</Label>
          <Select
            key={`selected-employee-${selectedEmployee}`}
            name="employee"
            defaultValue={selectedEmployee}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an Employee</SelectLabel>
                {companyExtra.data.employees.map((item) => (
                  <SelectItem
                    key={`company-employee-${item.employee_id}`}
                    value={`${item.employee_id}`}
                  >
                    ({item.employee_code}) - {getFullNameOfEmployee(item)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Pay Period</Label>
          <MonthPicker
            defaultValue={selectedDate}
            name="pay_period"
            key={`pay-period-${selectedDate}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Submit</Label>
          <Button className={ButtonSuccess} type="submit">
            <Icons.check />
            Submit
          </Button>
        </div>
      </form>

      {selectedEmployee && selectedDate ? (
        <DataTable columns={PayrollDataTableColumns} data={payroll.data} />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-12rem)]">
          <Icons.info className="size-16" />
          <p>Select an employee and a month to view their payroll</p>
        </div>
      )}
    </main>
  );
}
