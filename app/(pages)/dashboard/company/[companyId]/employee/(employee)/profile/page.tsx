"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { Metadata } from "next";
import { CompanyByIDPageProps } from "../../../PageProps";
import { getFullNameOfUser } from "@/utils/Misc";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  return {
    title: `Artemis | Employee Profile`,
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
        <p className="text-xl font-semibold">Profile</p>
        <ErrorFallbackCard error={company.error} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Profile</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title={`${getFullNameOfUser(user)}'s Profile`}
          user={user}
          company={company.data}
        />
      </div>
    </div>
  );
}
