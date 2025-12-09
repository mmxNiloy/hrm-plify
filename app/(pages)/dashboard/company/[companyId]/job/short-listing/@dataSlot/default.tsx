"use server";
import { AllJobApplicationsDataTableColumns } from "@/components/custom/DataTable/Columns/Recruitment/AllJobApplicationsDataTableColumns";
import { StaticDataTable } from "@/components/ui/data-table";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyShortlistedApplicants } from "@/app/(server)/actions/getCompanyShortlistedApplicants";
import { getCompanyShortlistedApplicantsByJobId } from "@/app/(server)/actions/getCompanyShortlistedApplicantsByJobId";
import { ShortlistedJobApplicationsDataTableColumns } from "@/components/custom/DataTable/Columns/Recruitment/ShortlistedApplicationsDataTableColumns";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function JobShortlistPageDataSlot({
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

  const mParams = await params;
  const companyId = mParams.companyId;

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);
  const job_id = Number.parseInt((sParams.job_id as string | undefined) ?? "0");

  const [company, applicants] = await Promise.all([
    getCompanyData(companyId),
    job_id == 0 || Number.isNaN(job_id)
      ? getCompanyShortlistedApplicants({
          companyId: Number.parseInt(companyId),
          page,
          limit,
        })
      : getCompanyShortlistedApplicantsByJobId({
          jobId: job_id,
          page,
          limit,
        }),
  ]);

  if (applicants.error || company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Shortlisted Applicants</p>
        <ErrorFallbackCard error={applicants.error ?? company.error} />
      </main>
    );
  }
  return (
    <StaticDataTable
      data={applicants.data.data.map((item) => ({
        ...item,
        updateAccess: updateAccess || writeAccess ? true : false,
        company: company.data,
      }))}
      pageCount={applicants.data.total_page}
      columns={ShortlistedJobApplicationsDataTableColumns}
    />
  );
}
