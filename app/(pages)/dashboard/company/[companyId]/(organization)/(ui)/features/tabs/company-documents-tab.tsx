"use server";
import { DataTable } from "@/components/ui/data-table";
import { ICompanyDoc } from "@/schema/CompanySchema";
import React from "react";
import CompanyDocumentEditDialog from "../../components/company-document/company-document-edit-dialog";
import { CompanyDocumentDataTableColumns } from "../table/columns";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonGradient } from "@/styles/button.tailwind";

export default async function CompanyDocumentsTab({
  companyId,
  readOnly,
}: {
  companyId: string;
  readOnly?: boolean;
}) {
  const company = await getCompanyDetails(companyId);

  if (company.error) {
    return <DataTableError errorMessage="Failed to load company data." />;
  }

  const data = company.data.company_docs_db;

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-lg font-semibold">Company Documents</p>
        {readOnly && (
          <CompanyDocumentEditDialog
            companyId={companyId}
            className={cn(ButtonGradient, "[&_svg]:size-4")}
          >
            <FilePlus2 />
            Create
          </CompanyDocumentEditDialog>
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
