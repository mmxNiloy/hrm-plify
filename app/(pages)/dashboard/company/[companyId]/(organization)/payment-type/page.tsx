"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { IPaymentType } from "@/schema/PaymentTypeSchema";
import { CompanyPaymentTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyPaymentTypeDataTableColumns";
import PaymentTypeEditPopover from "@/components/custom/Popover/Company/PaymentTypeEditPopover";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function TaxPage({ params }: CompanyByIDPageProps) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  // TODO: Hit the api and get actual employment types
  const paymentTypes: IPaymentType[] = [];

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payment Type Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Payment Type Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs title="Payment Type" />

        <PaymentTypeEditPopover company_id={Number.parseInt(companyId)} />
      </div>

      <DataTable
        data={paymentTypes}
        columns={CompanyPaymentTypeDataTableColumns}
      />
    </main>
  );
}
