"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import FindChangeOfCircumstancesByIDDialog from "@/components/custom/Dialog/Company/FindChangeOfCircumstancesByIDDialog";
import ChangeOfCircumstancesCreationDialog from "@/components/custom/Dialog/Company/ChangeOfCircumstancesCreationDialog";
import ChangeOfCircumstancesDataTable from "@/components/custom/DataTable/Company/Employee/ChangeOfCircumstancesDataTable";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function ChangeOfCircumstancesPage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Change of Circumstances</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Change of Circumstances</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="Change of Circumstances"
          parent="Employee Management"
          company={company.data}
          user={user}
        />

        <div className="flex flex-row gap-4">
          <FindChangeOfCircumstancesByIDDialog />

          <ChangeOfCircumstancesCreationDialog />
        </div>
      </div>

      <ChangeOfCircumstancesDataTable />
    </main>
  );
}
