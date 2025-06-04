"use server";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { IAnnualPay, IPayGroup } from "@/schema/PayGroupSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { CompanyAnnualPayDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyAnnualPayDataTableColumns";
import AnimatedTrigger from "@/components/custom/Popover/AnimatedTrigger";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { Skeleton } from "@/components/ui/skeleton";

export default async function AnnualPayPage({ params }: CompanyByIDPageProps) {
  const prms = await params;
  var companyId = prms.companyId;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Annual Payments</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  // TODO: Hit the api and get actual employment types
  const annualPays: IAnnualPay[] = [];
  const payGroups: IPayGroup[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Annual Payments</p>
      <div className="flex items-center justify-between">
        <Suspense fallback={<Skeleton className="h-4 w-3/5" />}>
          <MyBreadcrumbs title="Annual Pay" companyId={companyId} />
        </Suspense>

        <AnimatedTrigger disabled label={"Add a new Annual Pay (WIP)"} />
        {/* <AnnualPayEditPopover
          company_id={params.companyId}
          payGroups={payGroups}
        /> */}
      </div>

      <DataTable
        data={annualPays.map((item) => ({ ...item, payGroups }))}
        columns={CompanyAnnualPayDataTableColumns}
      />
    </main>
  );
}
