"use server";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import BankDetailsPage from "../features/bank-details-page";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import getSiteMetadata from "@/app/(server)/actions/site/get-site-metadata.controller";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "@/utils/searchParamsParsers";

interface Props {
  params: Promise<{
    bankId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mParams = await params;
  const bankId = mParams.bankId;
  const meta = await getSiteMetadata(
    bankId === "new" ? "New Bank" : "Edit Bank"
  );
  return meta;
}

export default async function BankByIdPage({ params, searchParams }: Props) {
  const [mParams, mPermissions, sParams] = await Promise.all([
    params,
    getCurrentUserPermissions(),
    searchParams,
  ]);

  const bankId = mParams.bankId;
  const writePermission = mPermissions?.find(
    (item) => item === "cmp_bank_create"
  );
  const readPermission = mPermissions?.find((item) => item === "cmp_bank_read");
  const updatePermission = mPermissions?.find(
    (item) => item === "cmp_bank_update"
  );

  if (!writePermission && !readPermission && !updatePermission)
    return notFound();

  let siteTitle = "New Bank";
  if (bankId !== "new") {
    siteTitle = "Edit Bank";
  }

  searchParamsCache.parse(sParams);

  return (
    <Suspense fallback={<Skeleton className="flex-1 w-full" />}>
      <BankDetailsPage pageTitle={siteTitle} bankId={bankId} />
    </Suspense>
  );
}
