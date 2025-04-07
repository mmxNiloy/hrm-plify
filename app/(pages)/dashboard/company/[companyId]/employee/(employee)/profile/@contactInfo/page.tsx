"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ContactInfoEditDialog from "@/components/custom/Dialog/Employee/ContactInfoEditDialog";
import ContactInfoFormFragment from "@/components/custom/Form/Fragment/Employee/ContactInfoFormFragment";
import { getContactInfo } from "@/app/(server)/actions/employee/getContactInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";

export default async function ContactInfoSlot({
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

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { companyId, employeeId } = await params;

  const emp = await getEmployeeData();
  const empId = emp.data?.data?.employee_id ?? 0;
  const { data: contactInfo, error } = await getContactInfo(
    emp.data?.data?.employee_id ?? 0
  );

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Contact Information
          </p>
          {/* <ContactInfoEditDialog data={contactInfo} employeeId={employeeId} /> */}
        </div>

        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Contact Information
        </p>
        {/* {updateAccess && (
        )} */}
        <ContactInfoEditDialog data={contactInfo} employeeId={empId} />
      </div>
      <ContactInfoFormFragment data={contactInfo} readOnly />
    </div>
  );
}
