"use client";
import { NetworkedDataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { CompanyDepartmentDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyDepartmentDataTableColumns";
import DepartmentCreationPopover from "@/components/custom/Popover/Department/DepartmentCreationPopover";

export default function CompanyDepartmentsTab({
  company_id,
}: {
  company_id: number;
}) {
  const [newDeptId, setNewDeptId] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Company Departments</p>
        <DepartmentCreationPopover company_id={company_id} />
      </div>
      <NetworkedDataTable
        src={`/api/company/department?company_id=${company_id}&_last=${newDeptId}`}
        columns={CompanyDepartmentDataTableColumns}
      />
    </div>
  );
}
