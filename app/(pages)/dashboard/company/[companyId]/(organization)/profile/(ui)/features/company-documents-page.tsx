"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React from "react";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import getCompanyDocuments from "@/app/(server)/actions/company/document/get-company-documents.controller";
import CompanyDocumentEditDialog from "../../../(ui)/components/company-document/company-document-edit-dialog";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { CompanyDocumentDataTableColumns } from "../../../(ui)/features/table/columns";

export default async function CompanyDocumentsPage({
  companyId,
}: {
  companyId: string;
}) {
  const page = searchParamsCache.get("page") ?? 1;
  const limit = searchParamsCache.get("limit") ?? 10;

  const [mPermissions, user, documents] = await Promise.all([
    getCurrentUserPermissions(),
    getCurrentUser(),
    getCompanyDocuments({ companyId, page, limit }),
  ]);

  const isAdmin =
    user?.user_roles?.roles?.role_name === "Super Admin" ||
    user?.user_roles?.roles?.role_name === "Admin";

  if (documents.error) {
    return <DataTableError errorMessage="Failed to fetch company documents." />;
  }

  const updateAccess = mPermissions?.find((item) => item === "cmp_mgmt_update");
  const writeAccess = mPermissions?.find((item) => item === "cmp_mgmt_create");

  const docs = documents.payload;
  const meta = documents.meta!;

  const key = `company-profile-key-${Date.now()}`;
  return (
    <div className="flex min-h-dvh flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Documents
        </p>
        {writeAccess && (
          <CompanyDocumentEditDialog
            companyId={companyId}
            className="bg-blue-500 hover:bg-blue-400 text-white shadow-sm hover:shadow-md"
          >
            <PlusIcon /> Add
          </CompanyDocumentEditDialog>
        )}
      </div>
      <DataTable
        key={key}
        data={docs.map((doc) => ({ ...doc, updateAccess: !!updateAccess }))}
        pageCount={meta.pageCount}
        totalItems={meta.total}
        columns={CompanyDocumentDataTableColumns}
      />
    </div>
  );
}
