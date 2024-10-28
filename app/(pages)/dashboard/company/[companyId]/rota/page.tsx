"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import WIPPage from "@/components/custom/Placeholder/WIPPage";

export default async function RotaDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Rota</p>

      <MyBreadcrumbs company={company} user={user} title="Rota" />

      <WIPPage />
    </main>
  );
}
