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
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";

export default async function VisaBRPDetailSlot({
  params,
}: EditEmployeeByIdProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_emp_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  // if (!readAccess) {
  //   return <AccessDenied />;
  // }
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const emp = await getEmployeeData();
  const empId = emp.data?.data?.employee_id ?? 0;

  const { data: visaBrp, error } = await getVisaBRPInfo(empId);
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
        {/* {updateAccess && (
        )} */}
        <VisaBrpEditDialog data={visaBrp} employee_id={employeeId} />
      </div>
      <VisaBrpFormFragment data={visaBrp} readOnly />
    </div>
  );
}
