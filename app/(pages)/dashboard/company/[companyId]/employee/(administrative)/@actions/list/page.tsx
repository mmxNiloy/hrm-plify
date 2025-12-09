"use server";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import React, { Suspense } from "react";
import { Filters } from "./components";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeCreationDialogWrapper } from "./features";

interface Props extends CompanyIDURLParamSchema {}

export default async function ActionsSlot({ params }: Props) {
  const [mParams, mPermissions] = await Promise.all([
    params,
    getCurrentUserPermissions(),
  ]);

  const companyId = mParams.companyId;

  const writeAccess = mPermissions?.filter((item) => item === "cmp_emp_create");

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
      <Filters />

      {/* Allow for adding a new employee */}

      {writeAccess && (
        <Suspense fallback={<Skeleton className="w-32 h-10" />}>
          <EmployeeCreationDialogWrapper companyId={companyId} />
        </Suspense>
      )}
    </div>
  );
}
