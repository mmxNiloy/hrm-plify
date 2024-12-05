"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import OrgChart from "@/components/custom/Organogram/OrgChart";
import { ITreeNode } from "@/schema/OrganogramSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

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

      <OrgChart employees={companyExtra.data.employees} companyId={companyId} />
    </main>
  );
}
