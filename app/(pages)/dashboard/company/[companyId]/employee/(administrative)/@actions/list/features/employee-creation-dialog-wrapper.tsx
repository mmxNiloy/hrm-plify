"use server";

import getAllDepartments from "@/app/(server)/actions/company/department/get-all-departments.controller";
import getAllDesignations from "@/app/(server)/actions/company/designation/get-all-designations.controller";
import RefreshButton from "@/components/custom/RefreshButton";
import React from "react";
import { EmployeeCreationDialog } from "../components";
import { UserPlus2 } from "lucide-react";
import getAllEmploymentTypes from "@/app/(server)/actions/employment-type/get-all-employment-type.controller";

interface Props {
  companyId: string;
}

export default async function EmployeeCreationDialogWrapper({
  companyId,
}: Props) {
  const [departments, designations, employmentTypes] = await Promise.all([
    getAllDepartments({ companyId }),
    getAllDesignations({ companyId }),
    getAllEmploymentTypes(),
  ]);

  if (departments.error) {
    return (
      <div className="flex flex-col gap-2 text-xs">
        <span>Failed to load departments.</span>
        <RefreshButton />
      </div>
    );
  }

  if (designations.error) {
    return (
      <div className="flex flex-col gap-2 text-xs">
        <span>Failed to load designations.</span>
        <RefreshButton />
      </div>
    );
  }

  if (employmentTypes.error) {
    return (
      <div className="flex flex-col gap-2 text-xs">
        <span>Failed to load employment types.</span>
        <RefreshButton />
      </div>
    );
  }

  return (
    <EmployeeCreationDialog
      departments={departments.payload}
      designations={designations.payload}
      employmentTypes={employmentTypes.payload}
      companyId={companyId}
      size="sm"
      variant={"gradient"}
      className="gap-1"
    >
      <UserPlus2 /> Add Employee
    </EmployeeCreationDialog>
  );
}
