"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import EducationalInfoEditDialog from "@/components/custom/Dialog/Employee/EducationalInfoEditDialog";
import { getEducationalInfo } from "@/app/(server)/actions/employee/getEducationalInfo";
import { DataTable } from "@/components/ui/data-table";
import { EducationalInfoDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/EducationalInfoDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";

export default async function EducationalInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_emp_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  if (!readAccess) {
    return <AccessDenied />;
  }
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { data: educationalInfo, error } = await getEducationalInfo(
    Number.parseInt(employeeId)
  );

  if (error) {
    return (
      <div className="flex flex-col gap-4 p-8 border rounded-md">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Educational Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Educational Information</p>
        {writeAccess && (
          <EducationalInfoEditDialog
            employee_id={Number.parseInt(employeeId)}
          />
        )}
      </div>
      <DataTable
        data={educationalInfo.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={EducationalInfoDataTableColumns}
      />
    </div>
  );
}
