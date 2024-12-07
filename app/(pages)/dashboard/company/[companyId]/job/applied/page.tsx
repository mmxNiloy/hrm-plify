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

export default async function JobAppliedPage({ params }: CompanyByIDPageProps) {
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
        <p className="text-xl font-semibold">All Jobs</p>
        <ErrorFallbackCard error={company.error || allJobs.error} />
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
          title="Job Applications"
        />

        <CompanyJobListSelect jobs={allJobs.data.data} />
      </div>
    </main>
  );
}
