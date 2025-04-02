"use server";

import getAllEmploymentTypes from "@/app/(server)/actions/getAllEmploymentTypes";
import { EmploymentTypeDataTableColumns } from "@/components/custom/DataTable/Columns/EmploymentTypeDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import EmploymentTypeEditPopover from "@/components/custom/Popover/Company/EmploymentTypeEditPopover";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import React from "react";

export default async function EmploymentTypePage() {
  const empTypes = await getAllEmploymentTypes();

  if (empTypes.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Employment Types</p>
        <ErrorFallbackCard error={empTypes.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Employment Types
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm sm:text-base">
            <BreadcrumbLink href=".">Dashboard</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Employment Types</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full sm:w-auto">
          <EmploymentTypeEditPopover />
        </div>
      </div>
      <DataTable
        data={empTypes.data}
        columns={EmploymentTypeDataTableColumns}
      />
    </main>
  );
}
