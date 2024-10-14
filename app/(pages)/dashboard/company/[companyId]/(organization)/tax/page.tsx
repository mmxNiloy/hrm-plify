"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import BankEditPopover from "@/components/custom/Popover/Company/BankEditPopover";
import { IBank } from "@/schema/BankSchema";
import { CompanyBankDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyBankDataTableColumns";
import { ITax } from "@/schema/TaxSchema";
import TaxEditPopover from "@/components/custom/Popover/Company/TaxEditPopover";
import { CompanyTaxDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyTaxDataTableColumns";

export default async function TaxPage({ params }: CompanyByIDPageProps) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  // TODO: Hit the api and get actual employment types
  const taxes: ITax[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Tax Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs title="Tax" company={company} user={user} />

        <TaxEditPopover company_id={params.companyId} />
      </div>

      <DataTable data={taxes} columns={CompanyTaxDataTableColumns} />
    </main>
  );
}
