"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { notFound } from "next/navigation";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import SponsorComplianceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/SponsorComplianceDashboardSidebar";

export default async function SidebarSlot({ params }: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  const company = await getCompanyData(companyId);

  if (company.error) {
    return notFound();
  }

  return <SponsorComplianceDashboardSidebar company={company.data} />;
}
