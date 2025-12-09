"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { notFound } from "next/navigation";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import CompanyDashboardSidebar from "@/components/custom/Dashboard/Sidebar/CompanyDashboardSidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

export default async function CompanyDocumentsPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);
  if (company.error) {
    return notFound();
  }
  return <CompanyDashboardSidebar user={user} company={company.data} />;
}
