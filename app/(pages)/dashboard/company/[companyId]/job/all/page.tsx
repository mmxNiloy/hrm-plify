"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyJobListings } from "@/app/(server)/actions/getCompanyJobListings";
import { JobListingDataTableColumns } from "@/components/custom/DataTable/Columns/Recruitment/JobListingDataTableColumns";
import JobListingEditDialog from "@/components/custom/Dialog/Recruitment/JobListingEditDialog";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | All Jobs`,
  };
}

export default async function JobListingsPage({ params, searchParams }: Props) {
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
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { limit, page } = getPaginationParams(await searchParams);

  const [company, jobs, employee, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getCompanyJobListings({
      company_id: companyId,
      page,
      limit,
    }),
    getEmployeeData(),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || jobs.error || companyExtra.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">All Jobs</p>
        <ErrorFallbackCard error={company.error ?? jobs.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">All Jobs</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Job & Recruitment"
          title="All Jobs"
        />
        {writeAccess && (
          <div className="w-full sm:w-auto">
            <JobListingEditDialog
              company_id={companyId}
              companyData={companyExtra.data}
              employeeId={employee.data?.data?.employee_id ?? 0}
            />
          </div>
        )}
      </div>

      <StaticDataTable
        pageCount={jobs.data.total_page}
        data={jobs.data.data.map((item) => ({
          ...item,
          companyData: companyExtra.data,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={JobListingDataTableColumns}
      />
    </main>
  );
}
