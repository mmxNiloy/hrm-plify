"use server";
import React from "react";
import { EditEmployeeByUserIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import ContactInfoEditDialog from "@/app/Components/Employee/EditDialog/ContactInfoEditDialog";
import ContactInfoFormFragment from "@/app/Components/Employee/EditDialog/ContactInfoEditDialog/form-fragment";
import { redirect } from "next/navigation";

export default async function ContactInfoSlot({
  params,
}: EditEmployeeByUserIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var contactInfo: IEmployeeContactInfo | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-contact-info/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > Contact Info > Data not found");
      redirect("/not-found");
    } else {
      const data = (await apiRes.json()) as {
        contact_information?: IEmployeeContactInfo;
      };

      contactInfo = data.contact_information;
    }
  } catch (err) {
    console.error("Edit Employee > Contact Info > Data not found");
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Contact Information</p>
        <ContactInfoEditDialog
          data={contactInfo}
          employeeId={params.employeeId}
        />
      </div>
      <ContactInfoFormFragment data={contactInfo} readOnly />
    </div>
  );
}
