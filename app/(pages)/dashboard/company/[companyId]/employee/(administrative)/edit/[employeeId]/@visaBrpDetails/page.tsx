"use server";
import { IEmployeeVisaBrp } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import VisaBrpEditDialog from "@/components/custom/Dialog/Employee/VisaBrpEditDialog";
import VisaBrpFormFragment from "@/components/custom/Form/Fragment/Employee/VisaBrpFormFragment";
import { getVisaBRPInfo } from "@/app/(server)/actions/employee/getVisaBRPInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function VisaBRPDetailSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { data: visaBrp, error } = await getVisaBRPInfo(employeeId);
  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">VISA/BRP Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">VISA/BRP Information</p>
        <VisaBrpEditDialog data={visaBrp} employee_id={employeeId} />
      </div>
      <VisaBrpFormFragment data={visaBrp} readOnly />
    </div>
  );
}
