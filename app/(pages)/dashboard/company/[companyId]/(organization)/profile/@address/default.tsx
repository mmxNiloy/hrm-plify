"use server";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { CompanyAddressPage } from "../(ui)/features";
import { CompanyAddressPageSkeleton } from "../(ui)/components";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

interface Props extends CompanyIDURLParamSchema {
  searchParams: Promise<SearchParams>;
}

export default async function CompanyAddressSlot({
  searchParams,
  params,
}: Props) {
  const [mParams, sParams] = await Promise.all([params, searchParams]);

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  const companyId = mParams.companyId;

  return (
    <Suspense key={key} fallback={<CompanyAddressPageSkeleton />}>
      <CompanyAddressPage companyId={companyId} />
    </Suspense>
  );
}
