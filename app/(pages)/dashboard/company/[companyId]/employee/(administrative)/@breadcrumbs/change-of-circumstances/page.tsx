"use server";

import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import StaffReportGenerator from "@/components/custom/PDF/StaffReportGenerator";
import EmployeeCombobox from "@/components/custom/Select/EmployeeCombobox";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import React, { Suspense } from "react";

export default async function StaffReportBreadcrumbs({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyExtraData(Number.parseInt(companyId));
  if (!company.data) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
      <Suspense fallback={<Skeleton className="w-3/5 h-10" />}>
        <MyBreadcrumbs
          companyId={companyId}
          parent="Employee Dashboard"
          title="Change of Circumstances"
        />
      </Suspense>

      {/* Download PDF button here */}
      <div className="w-full sm:w-auto">
        <EmployeeCombobox employees={company.data.employees} />
      </div>
    </div>
  );
}
