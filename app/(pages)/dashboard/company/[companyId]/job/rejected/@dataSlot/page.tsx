"use server";
import { AllJobApplicationsDataTableColumns } from "@/components/custom/DataTable/Columns/Recruitment/AllJobApplicationsDataTableColumns";
import { JobListingDataTableColumns } from "@/components/custom/DataTable/Columns/Recruitment/JobListingDataTableColumns";
import { StaticDataTable } from "@/components/ui/data-table";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { getCompanyJobApplicants } from "@/app/(server)/actions/getCompanyJobApplicants";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyJobApplicantsByJobId } from "@/app/(server)/actions/getCompanyJobApplicantsByJobId";
import { getJobListing } from "@/app/(server)/actions/getJobListing";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function JobAppliedPageDataSlot({
  searchParams,
  params,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_job_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_job_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_job_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);
  const job_id = Number.parseInt((sParams.job_id as string | undefined) ?? "0");

  var applicants = undefined;

  if (job_id == 0 || Number.isNaN(job_id)) {
    // Get all applicant data here
    applicants = await getCompanyJobApplicants({
      companyId,
      page,
      limit,
      category: "rejected",
    });
  } else {
    // Get all applicant data here
    applicants = await getCompanyJobApplicantsByJobId({
      jobId: job_id,
      page,
      limit,
      category: "rejected",
    });
  }

  if (applicants.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Job Applicants</p>
        <ErrorFallbackCard error={applicants.error} />
      </main>
    );
  }
  return (
    <StaticDataTable
      data={applicants.data.data.map((item) => ({
        ...item,
        updateAccess: updateAccess || writeAccess ? true : false,
      }))}
      pageCount={applicants.data.total_page}
      columns={AllJobApplicationsDataTableColumns}
    />
  );
}
