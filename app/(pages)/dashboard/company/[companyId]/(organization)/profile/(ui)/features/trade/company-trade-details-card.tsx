"use server";

import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React from "react";
import getCompanyTradeDetails from "@/app/(server)/actions/company/trade/details/get-company-trade-details.controller";
import {
  CompanyTradeDetailsEditDialog,
  CompanyTradeDetailsFormFragment,
} from "../../components";

interface Props {
  companyId: string;
  updateAccess?: boolean;
}

export default async function CompanyTradeDetailsCard({
  companyId,
  updateAccess,
}: Props) {
  const data = await getCompanyTradeDetails(companyId);

  if (data.error) {
    return <DataTableError errorMessage="Failed to fetch trade details." />;
  }

  const tradeDetails = data.payload;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          Trade Details
        </h3>
        {updateAccess && (
          <CompanyTradeDetailsEditDialog
            data={tradeDetails}
            companyId={companyId}
          />
        )}
      </div>
      <CompanyTradeDetailsFormFragment
        companyId={companyId}
        data={tradeDetails}
        readOnly
      />
    </div>
  );
}
