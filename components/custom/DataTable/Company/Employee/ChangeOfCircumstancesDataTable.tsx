"use server";
import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { ChangeOfCircumstancesDataTableColumns } from "../../Columns/Company/ChangeOfCircumstancesDataTableColumns";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import Icons from "@/components/ui/icons";
import getChangeOfCircumstances from "@/app/(server)/actions/change-of-circumstances/get-change-of-circumstances.controller";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function ChangeOfCircumstancesDataTable() {
  const employee = searchParamsCache.get("employee") ?? 0;
  if (employee < 1) {
    return (
      <div className="w-full flex-1 items-center justify-center flex flex-col min-h-[60vh] gap-2">
        <Icons.info className="size-32 sm:size-36 md:size-48 lg:size-64" />
        <p className="sm:text-lg md:text-xl lg:text-2xl font-bold">
          Please select an employee
        </p>
      </div>
    );
  }

  // Get change of circumstances data here
  const cocData = await getChangeOfCircumstances({
    employeeId: employee,
  });

  if (!cocData.ok) {
    return (
      <ErrorFallbackCard
        error={new Error("Failed to get change of circumstances data")}
      />
    );
  }

  return (
    <DataTable
      data={cocData.data.data}
      columns={ChangeOfCircumstancesDataTableColumns}
    />
  );
}
