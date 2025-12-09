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

  if (!readAccess) {
    return <AccessDenied />;
  }

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { companyId, employeeId } = await params;

  const { data: contactInfo, error } = await getContactInfo(
    Number.parseInt(employeeId)
  );

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Contact Information</p>
          {/* <ContactInfoEditDialog data={contactInfo} employeeId={employeeId} /> */}
        </div>

        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Contact Information</p>
        {updateAccess && (
          <ContactInfoEditDialog
            data={contactInfo}
            employeeId={Number.parseInt(employeeId)}
          />
        )}
      </div>
      <ContactInfoFormFragment data={contactInfo} readOnly />
    </div>
  );
}
