"use server";
import React from "react";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { CompanyByIDPageProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function UserAccessDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const company = await getCompanyData(companyId);
  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">User Access Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">User Access Management</p>
      <MyBreadcrumbs company={company.data} user={user} title="User Access" />

      <WIPPage />
    </main>
  );
}
