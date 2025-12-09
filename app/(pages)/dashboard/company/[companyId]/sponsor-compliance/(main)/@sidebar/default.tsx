"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import SponsorComplianceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/SponsorComplianceDashboardSidebar";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";

export default async function SponsorCompliancePageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const mParams = await params;
  const companyId = mParams.companyId;

  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payroll</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return <SponsorComplianceDashboardSidebar company={company.data} />;
}
