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

export default async function AnnualPayPage({ params }: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);

  // TODO: Hit the api and get actual employment types
  const annualPays: IAnnualPay[] = [];
  const payGroups: IPayGroup[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Annual Payments</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`..`}>Company Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`.`}
                className="line-clamp-1 text-ellipsis max-w-32"
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Annual Pay</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
