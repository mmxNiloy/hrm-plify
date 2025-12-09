"use server";

import RotaDashboardSidebar from "@/components/custom/Dashboard/Sidebar/RotaDashboardSidebar";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { TPermission } from "@/schema/Permissions";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function RotaPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_rota_read");

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

  return <RotaDashboardSidebar company={company.data} />;
}
