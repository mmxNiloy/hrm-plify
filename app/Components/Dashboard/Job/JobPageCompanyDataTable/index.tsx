import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function JobPageCompanyDataTable() {
  return <NetworkedDataTable src={"/api/job"} columns={columns} />;
}
