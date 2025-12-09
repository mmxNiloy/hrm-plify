"use server";

import JobDashboardSidebar from "@/components/custom/Dashboard/Sidebar/JobDashboardSidebar";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { TPermission } from "@/schema/Permissions";

export default async function JobPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_job_read");

  if (!readAccess) {
    return notFound();
  }

  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return notFound();
  }

  return <JobDashboardSidebar company={company.data} />;
}
