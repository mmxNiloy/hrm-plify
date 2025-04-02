"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
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
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Employment Types
        </p>

        <ErrorFallbackCard error={company.error ?? employments.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Employment Types
      </p>

      <MyBreadcrumbs
        title="Employment Type"
        company={company.data}
        user={user}
      />

      <DataTable
        data={employments.data.filter((item) => item.isActive)}
        columns={CompanyEmploymentTypeDataTableColumns}
      />
    </main>
  );
}
