"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getDesignations } from "@/app/(server)/actions/getDesignations";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { DataTable } from "@/components/ui/data-table";
import { JobsDataTableColumns } from "@/components/custom/DataTable/Columns/JobsDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import AnimatedTrigger from "@/components/custom/Popover/AnimatedTrigger";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function AllJobsPage({ params, searchParams }: Props) {
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { limit, page } = getPaginationParams(await searchParams);

  const [company, designations] = await Promise.all([
    getCompanyData(companyId),
    getDesignations({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  if (company.error || designations.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">All Jobs</p>
        <ErrorFallbackCard error={company.error ?? designations.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Jobs</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Job & Recruitment"
          title="All Jobs"
        />
        <AnimatedTrigger disabled label="Create a Job (WIP)" />
        {/* <CreateJobPopover company_id={params.companyId} /> */}
      </div>

      <DataTable data={designations.data} columns={JobsDataTableColumns} />
    </main>
  );
}
