"use server";

import React, { Suspense } from "react";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { CompanyDocumentsPage } from "../(ui)/features";
import { CompanyDocumentsPageSkeleton } from "../(ui)/components";

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

  if (companyProfileView !== "documents") return null;

  const companyId = mParams.companyId;

  return (
    <Suspense key={key} fallback={<CompanyDocumentsPageSkeleton />}>
      <CompanyDocumentsPage companyId={companyId} />
    </Suspense>
  );
}
