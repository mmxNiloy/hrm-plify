"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import OrgChart from "@/components/custom/Organogram/OrgChart";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
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
    } | Organogram Chart`,
  };
}

export default async function OrganogramPage({ params }: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const [company, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
  ]);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (company.error || companyExtra.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Organogram Chart</p>
        <ErrorFallbackCard error={company.error ?? companyExtra.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organogram Chart</p>
      <MyBreadcrumbs company={company.data} user={user} title="Organogram" />

      <OrgChart
        company={company.data}
        employees={companyExtra.data.employees}
        designations={companyExtra.data.designations}
        companyId={companyId}
      />
    </main>
  );
}
