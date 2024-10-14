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
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import CreateJobPopover from "@/components/custom/Popover/Job/CreateJobPopover";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getDesignations } from "@/app/(server)/actions/getDesignations";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { DataTable } from "@/components/ui/data-table";
import { JobsDataTableColumns } from "@/components/custom/DataTable/Columns/JobsDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function AllJobsPage({ params, searchParams }: Props) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { limit, page } = getPaginationParams(searchParams);
  const company = await getCompanyData(params.companyId);
  const designations = await getDesignations({
    company_id: company.company_id,
    page,
    limit,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Designations Dashboard</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="../../">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`..`}
                className="line-clamp-1 text-ellipsis max-w-32"
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href=".">Designations</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Designations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CreateJobPopover company_id={params.companyId} />
      </div>

      <DataTable data={designations} columns={JobsDataTableColumns} />
    </main>
  );
}
