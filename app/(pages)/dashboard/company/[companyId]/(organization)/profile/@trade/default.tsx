"use server";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyTradePage } from "../(ui)/features";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

interface Props extends CompanyIDURLParamSchema {
  searchParams: Promise<SearchParams>;
}

export default async function CompanyTradeSlot({
  searchParams,
  params,
}: Props) {
  const [mParams, sParams] = await Promise.all([params, searchParams]);

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  const companyId = mParams.companyId;

  return (
    <Suspense key={key} fallback={<Skeleton className="w-full flex-1" />}>
      <CompanyTradePage companyId={companyId} />
    </Suspense>
  );
}
