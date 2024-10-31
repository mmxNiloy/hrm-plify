"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ContractAgreementDataTable from "@/components/custom/DataTable/Company/Employee/ContractAgreementDataTable";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function ContactAgreementPage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyDetails(companyId);
  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Contract Agreement</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Contract Agreement</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Employee Management"
          title="Contract Agreement"
        />
      </div>

      {/* Main content, a table of employees */}
      <ContractAgreementDataTable />
    </main>
  );
}
