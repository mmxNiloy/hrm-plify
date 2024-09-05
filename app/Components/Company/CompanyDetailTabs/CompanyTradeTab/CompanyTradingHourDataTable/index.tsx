import { DataTable } from "@/components/ui/data-table";
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import React from "react";
import { columns } from "./columns";

export default function CompanyTradingHourDataTable({
  data,
}: {
  data: ICompanyTradingHour[];
}) {
  return <DataTable columns={columns} data={data} pageSize={7} />;
}
