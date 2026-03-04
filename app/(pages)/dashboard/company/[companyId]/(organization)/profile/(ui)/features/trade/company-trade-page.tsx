"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import React, { Suspense } from "react";
import CompanyTradeDetailsCard from "./company-trade-details-card";
import CompanyTradingHoursCard from "./company-trading-hours-card";
import { CompanyTradeDetailsSkeleton } from "../../components";

export default async function CompanyTradePage({
  companyId,
}: {
  companyId: string;
}) {
  const mPermissions = await getCurrentUserPermissions();

  const updateAccess = mPermissions?.find((item) => item === "cmp_mgmt_update");

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<CompanyTradeDetailsSkeleton />}>
        <CompanyTradeDetailsCard
          companyId={companyId}
          updateAccess={!!updateAccess}
        />
      </Suspense>
      <Suspense fallback={<CompanyTradeDetailsSkeleton />}>
        <CompanyTradingHoursCard
          companyId={companyId}
          updateAccess={!!updateAccess}
        />
      </Suspense>
    </div>
  );
}
