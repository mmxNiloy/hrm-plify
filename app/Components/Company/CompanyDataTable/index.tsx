import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function CompanyDataTable() {
  return <NetworkedDataTable src={"company"} columns={columns} />;
}
