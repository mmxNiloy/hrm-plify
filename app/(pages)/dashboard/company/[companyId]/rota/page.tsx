"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function RotaDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const companyId = (await params).companyId;
  const company = await getCompanyData(companyId);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Shift Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Rota</p>

      <MyBreadcrumbs company={company.data} user={user} title="Rota" />

      <WIPPage />
    </main>
  );
}
