"use server";
import React from "react";
import DepartmentCreationDialog from "../../components/designation-creation-dialog";
import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";
import { getAllDepartments } from "@/app/(server)/actions/getDepartments";

export default async function Actions({ companyId }: { companyId: string }) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const writeAccess = mPermissions.find((item) => item === "cmp_dept_create");

  if (!writeAccess) return null;

  const departments = await getAllDepartments(Number.parseInt(companyId));

  return (
    <div className="w-full sm:w-auto">
      <DepartmentCreationDialog
        departments={departments.data ?? []}
        company_id={companyId}
      />
    </div>
  );
}
