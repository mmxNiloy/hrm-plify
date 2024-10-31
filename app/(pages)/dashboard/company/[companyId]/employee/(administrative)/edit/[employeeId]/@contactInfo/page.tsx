"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { redirect } from "next/navigation";
import ContactInfoEditDialog from "@/components/custom/Dialog/Employee/ContactInfoEditDialog";
import ContactInfoFormFragment from "@/components/custom/Form/Fragment/Employee/ContactInfoFormFragment";
import { getContactInfo } from "@/app/(server)/actions/employee/getContactInfo";
import Icons from "@/components/ui/icons";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function ContactInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const { companyId, employeeId } = await params;

  const { data: contactInfo, error } = await getContactInfo(employeeId);

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
        <ContactInfoEditDialog data={contactInfo} employeeId={employeeId} />
      </div>
      <ContactInfoFormFragment data={contactInfo} readOnly />
    </div>
  );
}
