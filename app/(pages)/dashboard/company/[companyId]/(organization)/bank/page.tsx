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
import getBanks from "@/app/(server)/actions/bank/get-banks.controller";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "@/utils/searchParamsParsers";

interface Props extends CompanyByIDPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function BankingPage({ params, searchParams }: Props) {
  const [prms, user, sParams] = await Promise.all([
    params,
    getCurrentUser(),
    searchParams,
  ]);
  var companyId = prms.companyId;

  searchParamsCache.parse(sParams);
  const bankSearch = searchParamsCache.get("bankSearch");

  const [suggestedBanks, company, companyBanks] = await Promise.all([
    getBanks({
      search: bankSearch,
    }),
    getCompanyData(companyId),
    getBanks({ company_id: companyId }),
  ]);

  if (company.error || suggestedBanks.error || companyBanks.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Banking</p>
        <ErrorFallbackCard
          error={company.error ?? suggestedBanks.error ?? companyBanks.error}
        />
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

      <DataTable
        data={companyBanks.payload ?? []}
        columns={CompanyBankDataTableColumns}
      />
    </main>
  );
}
