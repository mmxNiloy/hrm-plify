"use server";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import BankEditPopover from "@/components/custom/Popover/Company/BankEditPopover";
import { IBank } from "@/schema/BankSchema";
import { CompanyBankDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyBankDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { Skeleton } from "@/components/ui/skeleton";

export default async function BankingPage({ params }: CompanyByIDPageProps) {
  const [prms, user] = await Promise.all([params, getCurrentUser()]);
  var companyId = prms.companyId;
  const company = await getCompanyData(companyId);

  // TODO: Hit the api and get actual employment types
  const banks: IBank[] = [];

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Banking</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  const company_id = Number.parseInt(companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Banking</p>
      <div className="flex items-center justify-between">
        <Suspense fallback={<Skeleton className="w-3/5 h-4" />}>
          <MyBreadcrumbs title="Banking" companyId={companyId} />
        </Suspense>

        <BankEditPopover company_id={company_id} />
      </div>

      <DataTable data={banks} columns={CompanyBankDataTableColumns} />
    </main>
  );
}
