"use server";
import React from "react";
import { EditEmployeeByUserIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";

export default async function ContactInfoSlot({
  params,
}: EditEmployeeByUserIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var contactInfo: { contact_information: IEmployeeContactInfo } | undefined =
    undefined;

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
      console.error("Data not found");
    } else {
      contactInfo = (await apiRes.json()) as {
        contact_information: IEmployeeContactInfo;
      };
    }
  } catch (err) {
    console.error("Failed to fetch company information", err);
    // redirect("/not-found");
  }
  return <div>ContactInfoSlot Status: {contactInfo ? "OK" : "Empty"}</div>;
}
