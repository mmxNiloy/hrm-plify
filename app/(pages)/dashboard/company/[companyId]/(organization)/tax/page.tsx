"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ITax } from "@/schema/TaxSchema";
import TaxEditPopover from "@/components/custom/Popover/Company/TaxEditPopover";
import { CompanyTaxDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyTaxDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function TaxPage({ params }: CompanyByIDPageProps) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  // TODO: Hit the api and get actual employment types
  const taxes: ITax[] = [];

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Tax Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Tax Management</p>

          <MyBreadcrumbs title="Tax" />
        </div>

        {/* <TaxEditPopover company_id={companyId} /> */}
      </div>

      <DataTable
        data={taxes}
        columns={CompanyTaxDataTableColumns}
        totalItems={taxes.length}
      />
    </main>
  );
}
