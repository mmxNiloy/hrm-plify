"use server";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import BillingDetailsPage from "../features/billing-details-page";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import getSiteMetadata from "@/app/(server)/actions/site/get-site-metadata.controller";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "@/utils/searchParamsParsers";

interface Props {
  params: Promise<{
    billId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mParams = await params;
  const billId = mParams.billId;
  const meta = await getSiteMetadata(
    billId === "new" ? "New Bill" : "Edit Bill"
  );
  return meta;
}

export default async function BillByIdPage({ params, searchParams }: Props) {
  const [mParams, mPermissions, sParams] = await Promise.all([
    params,
    getCurrentUserPermissions(),
    searchParams,
  ]);

  const billId = mParams.billId;
  const writePermission = mPermissions?.find(
    (item) => item === "sys_billing_create"
  );
  const readPermission = mPermissions?.find(
    (item) => item === "sys_billing_read"
  );
  const updatePermission = mPermissions?.find(
    (item) => item === "sys_billing_update"
  );

  if (!writePermission && !readPermission && !updatePermission)
    return notFound();

  let siteTitle = "New Bill";
  if (billId !== "new") {
    siteTitle = "Edit Bill";
  }

  searchParamsCache.parse(sParams);

  return (
    <Suspense fallback={<Skeleton className="flex-1 w-full" />}>
      <BillingDetailsPage pageTitle={siteTitle} billId={billId} />
    </Suspense>
  );
}
