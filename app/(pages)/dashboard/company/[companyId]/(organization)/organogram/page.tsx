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

export default async function OrganogramPage({ params }: CompanyByIDPageProps) {
  const [company, companyExtra] = await Promise.all([
    getCompanyData(params.companyId),
    getCompanyExtraData(params.companyId),
  ]);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organogram Chart</p>
      <MyBreadcrumbs company={company} user={user} title="Organogram" />

      <OrgChart
        employees={companyExtra.employees}
        companyId={params.companyId}
      />
    </main>
  );
}
