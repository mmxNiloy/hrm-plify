"use server";
import React from "react";
import { SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import SiteConfig from "@/utils/SiteConfig";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
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
