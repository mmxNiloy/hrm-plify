import { ICompanyTradeData } from "@/schema/CompanySchema";
import React from "react";
import CompanyTradeFormFragment from "../../Form/Fragment/Company/CompanyTradeFormFragment";
import CompanyTradeEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyTradeEditDialog";
import CompanyTradingHourDataTable from "../../DataTable/Company/CompanyTradingHourDataTable";
import CompanyTradingHoursEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyTradingHoursEditDialog";

export default function CompanyTradeTab({
  data,
  company_id,
  readOnly,
}: {
  data?: ICompanyTradeData;
  company_id: number;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
        <div className="col-span-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Company Trade Details
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyTradeEditDialog
                company_id={company_id}
                data={data?.company_trade_details}
              />
            </div>
          )}
        </div>

        <CompanyTradeFormFragment data={data?.company_trade_details} readOnly />
      </div>
      <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Trading Hours
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyTradingHoursEditDialog
                company_id={company_id}
                data={data?.company_trading_hour ?? []}
              />
            </div>
          )}
        </div>

        {/* Trading hours list */}
        <CompanyTradingHourDataTable data={data?.company_trading_hour ?? []} />
      </div>
    </div>
  );
}
