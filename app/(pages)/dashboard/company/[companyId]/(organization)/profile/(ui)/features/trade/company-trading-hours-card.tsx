"use server";

import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React from "react";
import getCompanyTradingHours from "@/app/(server)/actions/company/trade/hours/get-company-trading-hours.controller";
import {
  CompanyTradingHoursEditDialog,
  CompanyTradingHoursFormFragment,
} from "../../components";
import { z } from "zod";
import { TradingHourSchema } from "@/schema/form/company.schema";

interface Props {
  companyId: string;
  updateAccess?: boolean;
}

type TradeHour = z.infer<typeof TradingHourSchema>;

const fallbackValues: TradeHour[] = [
  {
    day_name: "Sunday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
  {
    day_name: "Monday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
  {
    day_name: "Tuesday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
  {
    day_name: "Wednesday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
  {
    day_name: "Thursday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
  {
    day_name: "Friday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
  {
    day_name: "Saturday",
    trade_status: 0,
    opening_time: "00:00",
    closing_time: "23:59",
  },
];

export default async function CompanyTradingHoursCard({
  companyId,
  updateAccess,
}: Props) {
  const data = await getCompanyTradingHours(companyId);

  if (data.error) {
    return <DataTableError errorMessage="Failed to fetch trading hours." />;
  }

  const tradeHours = data.payload ?? fallbackValues;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          Trading Hours
        </h3>
        {updateAccess && (
          <CompanyTradingHoursEditDialog
            data={tradeHours}
            companyId={companyId}
          />
        )}
      </div>
      <CompanyTradingHoursFormFragment
        readOnly
        companyId={companyId}
        data={tradeHours}
      />
    </div>
  );
}
