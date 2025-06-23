"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import AccessDenied from "@/components/custom/AccessDenied";
import React from "react";

export default async function AccessGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mPermissions = await getCurrentUserPermissions();

  const readAccess = mPermissions?.find((item) => item === "cmp_mgmt_read");

  if (!readAccess) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
