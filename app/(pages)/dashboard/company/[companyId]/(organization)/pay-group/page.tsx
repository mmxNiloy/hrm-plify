"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { IPayGroup } from "@/schema/PayGroupSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import PayGroupEditPopover from "@/components/custom/Popover/Company/PayGroupEditPopover";
import { CompanyPayGroupDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyPayGroupDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";

export default async function PayGroupPage({ params }: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  // TODO: Hit the api and get actual employment types
  const payGroups: IPayGroup[] = [];

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Pay Groups</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Pay Groups</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs title="Pay Group" company={company.data} user={user} />

        <PayGroupEditPopover company_id={companyId} />
      </div>

      <DataTable data={payGroups} columns={CompanyPayGroupDataTableColumns} />
    </main>
  );
}
