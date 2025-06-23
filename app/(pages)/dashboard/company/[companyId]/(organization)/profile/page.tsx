"use server";

import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { Metadata } from "next";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import SiteConfig from "@/utils/SiteConfig";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyProfilePage } from "./(ui)/features";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    }`,
  };
}

interface Props extends CompanyByIDPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function CompanyProfileSlot({
  params,
  searchParams,
}: Props) {
  const [mParams, sParams] = await Promise.all([params, searchParams]);

  searchParamsCache.parse(sParams);
  const companyProfileView =
    searchParamsCache.get("companyProfileView") ?? "profile";
  const key = serialize(sParams);

  if (companyProfileView !== "profile") return null;

  const companyId = mParams.companyId;

  return (
    <Suspense key={key} fallback={<Skeleton className="w-full flex-1" />}>
      <CompanyProfilePage companyId={companyId} />
    </Suspense>
  );
}
