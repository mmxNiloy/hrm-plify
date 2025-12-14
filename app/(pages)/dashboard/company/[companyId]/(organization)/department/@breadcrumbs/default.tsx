"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import React, { Suspense } from "react";

export default async function PageBreadcrumbs({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;
  return (
    <Suspense fallback={<Skeleton className="w-3/5 h-10" />}>
      <MyBreadcrumbs companyId={companyId} title="Departments" />
    </Suspense>
  );
}
