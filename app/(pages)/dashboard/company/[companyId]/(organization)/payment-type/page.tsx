"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import TaxEditPopover from "@/components/custom/Popover/Company/TaxEditPopover";
import { CompanyTaxDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyTaxDataTableColumns";
import { IPaymentType } from "@/schema/PaymentTypeSchema";
import { CompanyPaymentTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyPaymentTypeDataTableColumns";
import PaymentTypeEditPopover from "@/components/custom/Popover/Company/PaymentTypeEditPopover";

export default async function TaxPage({ params }: CompanyByIDPageProps) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  // TODO: Hit the api and get actual employment types
  const paymentTypes: IPaymentType[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Payment Type Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs title="Payment Type" company={company} user={user} />

        <PaymentTypeEditPopover company_id={params.companyId} />
      </div>

      <DataTable
        data={paymentTypes}
        columns={CompanyPaymentTypeDataTableColumns}
      />
    </main>
  );
}
