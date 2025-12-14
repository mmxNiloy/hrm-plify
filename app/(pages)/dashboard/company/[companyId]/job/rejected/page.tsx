"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyAllJobListingsMetadata } from "@/app/(server)/actions/getCompanyAllJobListingsMetadata";
import CompanyJobListSelect from "@/components/custom/Recruitment/CompanyJobListSelect";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Rejected Applicants`,
  };
}

export default async function JobHiredPage({ params }: CompanyByIDPageProps) {
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

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, allJobs] = await Promise.all([
    getCompanyData(companyId),
    getCompanyAllJobListingsMetadata({
      company_id: Number.parseInt(companyId),
      page: 0,
      limit: 0,
    }),
  ]);

  if (company.error || allJobs.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Rejected Applicants
        </p>
        <ErrorFallbackCard error={company.error || allJobs.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Rejected Applicants
          </p>
          <MyBreadcrumbs
            parent="Job & Recruitment"
            title="Rejected Applicants"
          />
        </div>

        <CompanyJobListSelect jobs={allJobs.data.data} />
      </div>
    </main>
  );
}
