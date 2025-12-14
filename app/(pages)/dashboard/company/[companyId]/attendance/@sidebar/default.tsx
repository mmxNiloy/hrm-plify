"use server";

import { notFound } from "next/navigation";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { TPermission } from "@/schema/Permissions";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

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

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/attendance`,
      icon: "note",
      title: "Attendance Records",
    },
    {
      href: `/dashboard/company/${companyId}/attendance/generate`,
      icon: "fileCog",
      title: "Generate Attendance",
      hidden:
        user.user_roles?.roles?.role_name !== "Super Admin" &&
        user.user_roles?.roles?.role_name !== "Admin",
    },
  ];
  return <AppSidebar navItems={navItems} companyId={companyId} />;
}
