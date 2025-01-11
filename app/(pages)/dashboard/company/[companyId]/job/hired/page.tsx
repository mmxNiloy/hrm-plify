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

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Hired Applicants`,
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

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, allJobs] = await Promise.all([
    getCompanyData(companyId),
    getCompanyAllJobListingsMetadata({ company_id: companyId }),
  ]);

  if (company.error || allJobs.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Job Applications</p>
        <ErrorFallbackCard error={company.error || allJobs.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Hired Applicants</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Job & Recruitment"
          title="Hired Applicants"
        />

        <CompanyJobListSelect jobs={allJobs.data.data} />
      </div>
    </main>
  );
}
