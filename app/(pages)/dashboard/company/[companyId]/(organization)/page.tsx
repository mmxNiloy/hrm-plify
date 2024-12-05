"use server";
import { ICompanyDetails } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import CompanyDetailTabs from "@/components/custom/Tabs/CompanyDetailTabs";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps {
  readOnly?: boolean;
  parent?: string;
  title?: string;
}

export default async function CompanyByIDPage({
  params,
  readOnly,
  parent,
  title,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var company = await getCompanyDetails(companyId);

  // Guard unauthorized access
  if (
    user.user_roles?.roles.role_name !== "Super Admin" &&
    user.user_roles?.roles.role_name !== "Admin" &&
    user.usercompany?.company_id != Number.parseInt(`${companyId}`)
  ) {
    redirect(
      `/dashboard/company/${user.usercompany?.company_id}/?_ref=unauthorized-access`
    );
  }

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Details</p>

        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  // console.log("Company Details > Company Doc Db", company.data.company_docs_db);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Details</p>

      <MyBreadcrumbs
        company={company.data}
        user={user}
        parent={parent}
        title={title}
      />

      <CompanyDetailTabs readOnly={readOnly} company={company.data} />
    </main>
  );
}
