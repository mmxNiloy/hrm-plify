"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import React from "react";
import { CompanyByIDPageProps } from "../../../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function EditEmployeeInfoByUserIdPage({
  params,
}: CompanyByIDPageProps) {
  const companyId = (await params).companyId;
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
