"use server";

import AttendanceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/AttendanceDashboardSidebar";
import { notFound } from "next/navigation";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { TPermission } from "@/schema/Permissions";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function AttendanceDashboardSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const [mCookies, mParams] = await Promise.all([cookies(), params]);
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_attend_read");

  if (!readAccess) {
    return notFound();
  }

  // Get company information
  const companyId = mParams.companyId;
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return notFound();
  }
  return <AttendanceDashboardSidebar user={user} company={company.data} />;
}
