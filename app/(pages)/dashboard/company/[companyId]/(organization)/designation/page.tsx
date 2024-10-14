"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getDesignations } from "@/app/(server)/actions/getDesignations";
import DesignationEditPopover from "@/components/custom/Popover/Company/DesignationEditPopover";
import { CompanyDesignationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyDesignationDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function DesignationsPage({
  params,
  searchParams,
}: Props) {
  const { limit, page } = getPaginationParams(searchParams);
  const company = await getCompanyData(params.companyId);
  const designations = await getDesignations({
    company_id: params.companyId,
    page,
    limit,
  });
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Designations</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company} user={user} title="Designations" />

        <DesignationEditPopover company_id={params.companyId} />
      </div>

      <DataTable
        data={designations}
        columns={CompanyDesignationDataTableColumns}
      />
    </main>
  );
}
