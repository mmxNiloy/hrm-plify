"use server";
import React from "react";
import DepartmentCreationDialog from "../../components/department-creation-dialog";
import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";

export default async function Actions({ companyId }: { companyId: string }) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const writeAccess = mPermissions.find((item) => item === "cmp_dept_create");

  if (!writeAccess) return null;

  return (
    <div className="w-full sm:w-auto">
      <DepartmentCreationDialog company_id={companyId} />
    </div>
  );
}
