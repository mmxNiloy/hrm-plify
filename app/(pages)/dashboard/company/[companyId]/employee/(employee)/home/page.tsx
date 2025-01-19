"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { Metadata } from "next";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { CompanyByIDPageProps } from "../../../PageProps";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Edit Employee Data`,
  };
}

export default async function EditEmployeeInfoByUserIdPage({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);
  if (company.error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Employee Details</p>
        <ErrorFallbackCard error={company.error} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Details</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="Employee Management"
          user={user}
          company={company.data}
        />
      </div>
    </div>
  );
}
