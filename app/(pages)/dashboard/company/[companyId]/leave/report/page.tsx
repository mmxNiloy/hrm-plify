"use server";
import { ILeaveBalance } from "@/schema/LeaveSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
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
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveReportPage({
  params,
  searchParams,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);

  // Search filters
  const yearFilter = (sParams.year as string | undefined) ?? "";
  const employeeIdFilter = (sParams.employee_id as string | undefined) ?? "";

  const company = await getCompanyData(companyId);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Leave Report</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Report</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Leave"
          title="Leave Balance"
        />

        <div className="flex flex-row gap-2 items-center justify-center">
          <Button
            disabled
            className={
              "bg-green-500 hover:bg-green-400 text-white rounded-full gap-2"
            }
          >
            <Icons.excel className="fill-white stroke-white" /> Download as
            Excel (WIP)
          </Button>
          <Button
            disabled
            className={
              "bg-rose-500 hover:bg-rose-400 text-white rounded-full gap-2"
            }
          >
            <Icons.pdf className="fill-white stroke-white" /> Download as PDF
            (WIP)
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
    </main>
  );
}
