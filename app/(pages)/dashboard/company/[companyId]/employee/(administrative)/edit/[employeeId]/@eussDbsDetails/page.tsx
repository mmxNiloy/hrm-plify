"use server";
import { IEmployeeEussDbsData } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import EussDbsEditDialog from "@/components/custom/Dialog/Employee/EussDbsEditDialog";
import EussFormFragment from "@/components/custom/Form/Fragment/Employee/EussFormFragment";
import DbsFormFragment from "@/components/custom/Form/Fragment/Employee/DbsFormFragment";
import { getEussDBInfo } from "@/app/(server)/actions/employee/getEussDBInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function EussDetailsSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { data: euss, error } = await getEussDBInfo(employeeId);

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">EUSS/Time Limit Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">EUSS/Time Limit Information</p>
          <EussDbsEditDialog data={euss} employee_id={employeeId} />
        </div>
        <EussFormFragment readOnly data={euss} />
      </div>

      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">
            Disclosure and Barring Service (DBS) Details
          </p>
          {/* <DbsEditDialog data={euss} employee_id={params.employeeId} /> */}
        </div>
        <DbsFormFragment readOnly data={euss} />
      </div>
    </div>
  );
}
