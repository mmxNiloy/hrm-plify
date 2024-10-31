"use server";
import { IEmployeeNid } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import NidFormFragment from "@/components/custom/Form/Fragment/Employee/NidFormFragment";
import NidEditDialog from "@/components/custom/Dialog/Employee/NidEditDialog";
import { getNIDInfo } from "@/app/(server)/actions/employee/getNIDInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function NidDetailsSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { data: nid, error } = await getNIDInfo(employeeId);
  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">National ID Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">National ID Information</p>
        <NidEditDialog data={nid} employee_id={employeeId} />
      </div>
      <NidFormFragment data={nid} readOnly />
    </div>
  );
}
