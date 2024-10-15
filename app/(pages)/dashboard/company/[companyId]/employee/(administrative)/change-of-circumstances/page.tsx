"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import FindChangeOfCircumstancesByIDDialog from "@/components/custom/Dialog/Company/FindChangeOfCircumstancesByIDDialog";
import ChangeOfCircumstancesCreationDialog from "@/components/custom/Dialog/Company/ChangeOfCircumstancesCreationDialog";
import ChangeOfCircumstancesDataTable from "@/components/custom/DataTable/Company/Employee/ChangeOfCircumstancesDataTable";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export default async function ChangeOfCircumstancesPage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Change of Circumstances</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="Change of Circumstances"
          parent="Employee Management"
          company={company}
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
