"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { IAnnualPay, IPayGroup } from "@/schema/PayGroupSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import AnnualPayEditPopover from "@/components/custom/Popover/Company/AnnualPayEditPopover";
import { CompanyAnnualPayDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyAnnualPayDataTableColumns";
import AnimatedTrigger from "@/components/custom/Popover/AnimatedTrigger";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function AnnualPayPage({ params }: CompanyByIDPageProps) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { data: company, error } = await getCompanyData(
    (
      await params
    ).companyId
  );

  if (error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Annual Payments</p>
        <ErrorFallbackCard error={error} />
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
        <MyBreadcrumbs company={company} user={user} title="Annual Pay" />

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
