"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { redirect } from "next/navigation";
import EducationalInfoDataTable from "@/components/custom/DataTable/Company/Employee/EducationalInfoDataTable";
import EducationalInfoEditDialog from "@/components/custom/Dialog/Employee/EducationalInfoEditDialog";
import { getEducationalInfo } from "@/app/(server)/actions/employee/getEducationalInfo";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { EducationalInfoDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/EducationalInfoDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function EducationalInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { data: educationalInfo, error } = await getEducationalInfo(employeeId);

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
        <EducationalInfoEditDialog employee_id={employeeId} />
      </div>
      <DataTable
        data={educationalInfo}
        columns={EducationalInfoDataTableColumns}
      />
    </div>
  );
}
