"use server";

import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { TPermission } from "@/schema/Permissions";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import HolidayDashboardSidebar from "@/components/custom/Dashboard/Sidebar/HolidayDashboardSidebar";

export default async function HolidayDashboardPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_hol_read");

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

  return <HolidayDashboardSidebar company={company.data} />;
}
