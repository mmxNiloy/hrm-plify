"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import EmploymentTypeEditPopover from "@/components/custom/Popover/Company/EmploymentTypeEditPopover";
import { CompanyEmploymentTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyEmploymentTypeDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import getAllEmploymentTypes from "@/app/(server)/actions/getAllEmploymentTypes";

export default async function EmploymentTypePage({
  params,
}: CompanyByIDPageProps) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const [company, employments] = await Promise.all([
    getCompanyData(companyId),
    getAllEmploymentTypes(),
  ]);

  if (company.error || employments.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Employment Types</p>

        <ErrorFallbackCard error={company.error ?? employments.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Employment Types</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="Employment Type"
          company={company.data}
          user={user}
        />
      </div>

      <DataTable
        data={employments.data.filter((item) => item.isActive)}
        columns={CompanyEmploymentTypeDataTableColumns}
      />
    </main>
  );
}
