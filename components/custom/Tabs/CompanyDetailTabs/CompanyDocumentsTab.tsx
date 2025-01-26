import { DataTable } from "@/components/ui/data-table";
import { ICompanyDoc } from "@/schema/CompanySchema";
import React from "react";
import { CompanyDocumentDataTableColumns } from "../../DataTable/Columns/Company/CompanyDocumentDataTableColumns";
import CompanyDocumentEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyDocumentEditDialog";

export default function CompanyDocumentsTab({
  data,
  company_id,
  readOnly,
}: {
  data?: ICompanyDoc[];
  company_id: number;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md">
      <div className="flex felx-row items-center justify-between">
        <p className="text-lg font-semibold">Company Documents</p>
        {!readOnly && (
          <CompanyDocumentEditDialog company_id={company_id} type="create" />
        )}
      </div>

      <DataTable
        data={data?.map((item) => ({ ...item, updateAccess: !readOnly })) ?? []}
        columns={CompanyDocumentDataTableColumns}
      />
    </div>
  );
}
