import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function RotaCompanyDataTable() {
  return <NetworkedDataTable src={"/api/company"} columns={columns} />;
}
