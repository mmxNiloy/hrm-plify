"use server";

import React from "react";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function BreadcrumbsProvider({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  return (
    <MyBreadcrumbs
      companyId={companyId}
      parent={"Company Dashboard"}
      title={"Organization Profile"}
    />
  );
}
