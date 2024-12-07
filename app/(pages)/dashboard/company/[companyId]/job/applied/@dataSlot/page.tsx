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

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function JobAppliedPageDataSlot({
  searchParams,
  params,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);
  const job_id = sParams.job_id as string | undefined;

  if (!job_id) {
    // Get all applicant data here
    const applicants = await getCompanyJobApplicants({
      companyId,
      page,
      limit,
    });
    if (applicants.error) {
      return (
        <main className="container flex flex-col gap-2">
          <p className="text-xl font-semibold">All Job Applicants</p>
          <ErrorFallbackCard error={applicants.error} />
        </main>
      );
    }

    return (
      <StaticDataTable
        data={applicants.data.data}
        pageCount={applicants.data.total_page}
        columns={AllJobApplicationsDataTableColumns}
      />
    );
  }

  // Get all applicant data here
  const [applicants, job] = await Promise.all([
    getCompanyJobApplicantsByJobId({
      jobId: Number.parseInt(job_id),
      page,
      limit,
    }),
    getJobListing(job_id),
  ]);

  if (applicants.error || job.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Job Applicants</p>
        <ErrorFallbackCard error={applicants.error || job.error} />
      </main>
    );
  }
  return (
    <StaticDataTable
      data={applicants.data.data.map((item) =>
        Object.assign(item, { job: job.data })
      )}
      pageCount={applicants.data.total_page}
      columns={AllJobApplicationsDataTableColumns}
    />
  );
}
