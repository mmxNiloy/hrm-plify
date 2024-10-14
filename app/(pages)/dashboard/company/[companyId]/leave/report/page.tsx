"use server";
import { ILeaveBalance } from "@/schema/LeaveSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboBox } from "@/components/ui/combobox";
import { ButtonWarn } from "@/styles/button.tailwind";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveReportPage({
  params,
  searchParams,
}: Props) {
  const { page, limit } = getPaginationParams(searchParams);

  // Search filters
  const yearFilter = (searchParams.year as string | undefined) ?? "";
  const employeeIdFilter =
    (searchParams.employee_id as string | undefined) ?? "";

  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var balance: ILeaveBalance[] = [];
  var total_page: number = 1;

  try {
    // TODO: Hit the api to get data
  } catch (_) {
    balance = [];
    total_page = 1;
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Type</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {(user.user_roles?.roles.role_name === "Super Admin" ||
              user.user_roles?.roles.role_name === "Admin") && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="line-clamp-1 text-ellipsis max-w-32"
                    href="/dashboard/leave"
                  >
                    Leave
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href={`/dashboard/company/${company.company_id}`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave Report</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-row gap-2 items-center justify-center">
          <Button
            className={
              "bg-green-500 hover:bg-green-400 text-white rounded-full gap-2"
            }
          >
            <Icons.excel className="fill-white stroke-white" /> Download as
            Excel
          </Button>
          <Button
            className={
              "bg-rose-500 hover:bg-rose-400 text-white rounded-full gap-2"
            }
          >
            <Icons.pdf className="fill-white stroke-white" /> Download as PDF
          </Button>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex flex-col gap-2">
          <Label>Choose Year</Label>
          <Select name="year" defaultValue={yearFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Year" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose year</SelectLabel>
                {Array.from(
                  { length: 20 },
                  (_, index) => new Date().getFullYear() - index
                ).map((item) => (
                  <SelectItem
                    value={`${item}`}
                    key={`year-select-item-${item}`}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Choose Employee</Label>
          <ComboBox
            defaultValue={employeeIdFilter}
            items={[
              "EMP-101 > Aaron Paul",
              "EMP-102 > Bianca Köler",
              "EMP-103 > Christopher Cross",
            ]}
            name="employee_id"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Filter</Label>
          <Button className={ButtonWarn}>
            <Icons.filter /> Apply Filters
          </Button>
        </div>
      </form>

      {/* <StaticDataTable
    columns={LeaveBalanceDataTableColumns}
    data={balance}
    pageCount={total_page}
  /> */}
    </main>
  );
}
