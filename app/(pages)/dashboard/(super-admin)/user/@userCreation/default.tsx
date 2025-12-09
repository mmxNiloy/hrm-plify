"use server";
import getPermissions from "@/app/(server)/actions/permissions/get-permissions.controller";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import UserCreationDialog from "../components/user-creation-dialog";
import RefreshButton from "@/components/custom/RefreshButton";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";

export default async function UserCreationSlot() {
  const perms = await getCurrentUserPermissions();

  const writeAccess = perms?.find((item) => item === "sys_user_create");

  if (!writeAccess) return null;

  const permissions = await getPermissions({ isActive: true });

  if (permissions.error) {
    return (
      <div className="flex flex-col gap-1 text-destructive text-xs">
        <span>Error</span>
        <RefreshButton />
      </div>
    );
  }

  const data = permissions.payload;

  return <UserCreationDialog permissions={data} />;
}
