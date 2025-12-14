import { DataTable } from "@/components/ui/data-table/data-table";
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import React from "react";
import { CompanyTradingHourDataTableColumns } from "../Columns/Company/CompanyTradingHourDataTableColumns";

export default function CompanyTradingHourDataTable({
  data,
}: {
  data: ICompanyTradingHour[];
}) {
  return <DataTable columns={CompanyTradingHourDataTableColumns} data={data} />;
}
