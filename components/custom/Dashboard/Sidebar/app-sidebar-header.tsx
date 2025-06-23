"use server";
import React from "react";
import { getCompany } from "@/app/(server)/actions/company/get-company.controller";
import AppSidebarHeaderLink from "./app-sidebar-link";

interface Props {
  companyId?: string;
}

export default async function AppSidebarHeader({ companyId }: Props) {
  if (!companyId) {
    return <AppSidebarHeaderLink />;
  }

  const company = await getCompany(companyId);

  if (company.error) {
    return <AppSidebarHeaderLink />;
  }

  const data = company.payload;

  return (
    <AppSidebarHeaderLink
      link={`/dashboard/company/${data.company_id}`}
      logoUrl={data.logo}
      altText={data.company_name}
    />
  );
}
