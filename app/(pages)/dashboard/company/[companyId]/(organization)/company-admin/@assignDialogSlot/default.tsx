"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import React from "react";
import { CompanyAdminAssignDialog } from "../(ui)/components";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function AssignDialogSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const mPermissions = await getCurrentUserPermissions();
  const writeAccess = mPermissions?.find((item) => item === "cmp_admin_create");

  if (writeAccess)
    return (
      <div className="w-full sm:w-auto">
        <CompanyAdminAssignDialog companyId={companyId} />
      </div>
    );

  return null;
}
