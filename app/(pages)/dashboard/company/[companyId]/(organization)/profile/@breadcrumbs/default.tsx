"use server";

import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export default async function BreadcrumbsProvider({
  params,
}: CompanyByIDPageProps) {
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
