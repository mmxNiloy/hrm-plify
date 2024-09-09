import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ICompanyTradeData,
  ICompanyTradeDetails,
  ICompanyTradingHour,
} from "@/schema/CompanySchema";
import React from "react";
import CompanyTradeFormFragment from "../../CompanyEditDialog/CompanyTradeEditDialog/form-fragment";
import CompanyTradeEditDialog from "../../CompanyEditDialog/CompanyTradeEditDialog";
import CompanyTradingHourDataTable from "./CompanyTradingHourDataTable";
import CompanyTradingHoursEditDialog from "../../CompanyEditDialog/CompanyTradingHoursEditDialog";

export default function CompanyTradeTab({
  data,
  company_id,
}: {
  data?: ICompanyTradeData;
  company_id: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold col-span-full">
            Company Trade Details
          </p>
          <CompanyTradeEditDialog
            company_id={company_id}
            data={data?.company_trade_details}
          />
        </div>

        <CompanyTradeFormFragment data={data?.company_trade_details} readOnly />
      </div>
      <div className="flex flex-col gap-4 p-8 border rounded-md">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Trading Hours</p>
          <CompanyTradingHoursEditDialog
            company_id={company_id}
            data={data?.company_trading_hour ?? []}
          />
        </div>

        {/* Trading hours list */}
        <CompanyTradingHourDataTable data={data?.company_trading_hour ?? []} />
      </div>
    </div>
  );
}
