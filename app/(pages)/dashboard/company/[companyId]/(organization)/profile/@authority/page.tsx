"use server";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyAuthorityPage } from "../(ui)/features";

interface Props extends CompanyByIDPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function CompanyAuthoritySlot({
  searchParams,
  params,
}: Props) {
  const [mParams, sParams] = await Promise.all([params, searchParams]);

  searchParamsCache.parse(sParams);
  const companyProfileView =
    searchParamsCache.get("companyProfileView") ?? "profile";
  const key = serialize(sParams);

  if (companyProfileView !== "authority") return null;

  const companyId = mParams.companyId;

  return (
    <Suspense key={key} fallback={<Skeleton className="w-full flex-1" />}>
      <CompanyAuthorityPage companyId={companyId} />
    </Suspense>
  );
}
