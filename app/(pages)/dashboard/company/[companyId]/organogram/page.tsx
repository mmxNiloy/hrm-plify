"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export default async function OrganogramPage({ params }: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organogram Chart</p>
      <MyBreadcrumbs company={company} user={user} title="Holiday" />

      <WIPPage />
    </main>
  );
}
