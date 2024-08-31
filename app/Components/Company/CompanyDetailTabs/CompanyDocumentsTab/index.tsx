import { Accordion } from "@/components/ui/accordion";
import { DataTable } from "@/components/ui/data-table";
import { ICompanyDoc } from "@/schema/CompanySchema";
import React from "react";
import { columns } from "./columns";

export default function CompanyDocumentsTab({
  data,
}: {
  data?: ICompanyDoc[];
}) {
  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md">
      <p className="text-lg font-semibold">Company Documents</p>

      <DataTable data={data ?? []} columns={columns} />
    </div>
  );
}
