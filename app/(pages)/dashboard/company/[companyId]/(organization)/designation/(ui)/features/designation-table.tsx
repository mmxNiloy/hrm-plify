"use server";
import getDesignations from "@/app/(server)/actions/company/designation/get-designation.controller";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import { columns } from "./table";

interface Props {
  companyId: string;
}

export default async function DesignationTable({ companyId }: Props) {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const search = searchParamsCache.get("search");
  const isActive = searchParamsCache.get("status");

  const [result, mPermissions] = await Promise.all([
    getDesignations({ companyId, page, limit, search, isActive }),

    getCurrentUserPermissions(),
  ]);

  if (result.error) {
    return <DataTableError errorMessage="Failed to fetch designations" />;
  }

  const designations = result.payload;
  const meta = result.meta!;
  const updateAccess = mPermissions?.find((item) => item === "cmp_desg_update");

  console.log("Designations", designations);

  return (
    <DataTable
      data={designations.map((item) => ({
        ...item,
        updateAccess: !!updateAccess,
      }))}
      columns={columns}
      totalItems={meta.total}
      pageCount={meta.pageCount}
    />
  );
}
