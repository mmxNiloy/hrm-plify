"use server";

import LeaveDashboardSidebar from "@/components/custom/Dashboard/Sidebar/LeaveDashboardSidebar";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { notFound } from "next/navigation";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import { TPermission } from "@/schema/Permissions";

export default async function LeavePageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_leave_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_leave_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_leave_update");

  if (!readAccess) {
    return notFound();
  }

  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return notFound();
  }

  return <LeaveDashboardSidebar company={company.data} />;
}
