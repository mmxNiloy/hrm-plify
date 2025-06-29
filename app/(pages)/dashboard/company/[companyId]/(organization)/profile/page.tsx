"use server";

import React, { Suspense } from "react";
import { Metadata } from "next";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import SiteConfig from "@/utils/SiteConfig";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { CompanyProfilePage } from "./(ui)/features";
import { CompanyProfilePageSkeleton } from "./(ui)/components";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  return await getCompanyMeta(companyId, "Profile");
}

interface Props extends CompanyIDURLParamSchema {
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
    <Suspense key={key} fallback={<CompanyProfilePageSkeleton />}>
      <CompanyProfilePage companyId={companyId} />
    </Suspense>
  );
}
