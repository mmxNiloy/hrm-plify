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
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import AnimatedTrigger from "@/components/custom/Popover/AnimatedTrigger";

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
      <p className="text-xl font-semibold">All Jobs</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Job & Recruitment"
          title="All Jobs"
        />
        <AnimatedTrigger disabled label="Create a Job (WIP)" />
        {/* <CreateJobPopover company_id={params.companyId} /> */}
      </div>

      <DataTable data={designations} columns={JobsDataTableColumns} />
    </main>
  );
}
