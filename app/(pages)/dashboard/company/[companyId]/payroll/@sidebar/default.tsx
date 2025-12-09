"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import PayrollDashboardSidebar from "@/components/custom/Dashboard/Sidebar/PayrollDashboardSidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function PayrollPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_payroll_read");
  const writeAccess = mPermissions.find(
    (item) => item === "cmp_payroll_create"
  );
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_payroll_update"
  );

  if (!readAccess) {
    return <AccessDenied />;
  }

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

  return <PayrollDashboardSidebar company={company.data} />;
}
