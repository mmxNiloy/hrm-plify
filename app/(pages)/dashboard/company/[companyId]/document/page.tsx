"use server";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { cookies } from "next/headers";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import CompanyDocumentsTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyDocumentsTab";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Document Management`,
  };
}

export default async function DocumentsPage({ params }: CompanyByIDPageProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_docs_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_docs_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_docs_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;

  const companyDetails = await getCompanyDetails(companyId);

  if (companyDetails.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Documents</p>

        <ErrorFallbackCard error={companyDetails.error} />
      </main>
    );
  }

  return (
    <CompanyDocumentsTab
      readOnly={!updateAccess || !writeAccess}
      company_id={companyId}
      data={companyDetails.data?.company_docs_db}
    />
  );
}
