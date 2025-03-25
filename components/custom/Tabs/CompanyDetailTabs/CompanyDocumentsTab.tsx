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
    <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-lg font-semibold">Company Documents</p>
        {!readOnly && (
          <CompanyDocumentEditDialog company_id={company_id} type="create" />
        )}
      </div>

      <div className="overflow-x-auto">
        <DataTable
          data={
            data?.map((item) => ({ ...item, updateAccess: !readOnly })) ?? []
          }
          columns={CompanyDocumentDataTableColumns}
        />
      </div>
    </div>
  );
}
