"use server";
import { IEmployeeNid } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import NidFormFragment from "@/app/Components/Employee/EditDialog/NidEditDialog/form-fragment";
import NidEditDialog from "@/app/Components/Employee/EditDialog/NidEditDialog";

export default async function NidDetailsSlot({
  params,
}: EditEmployeeByIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var nid: IEmployeeNid | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-nid-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > Visa BRP Info > Data not found");
      redirect("/not-found");
    } else {
      const result = (await apiRes.json()) as {
        message: string;
        data?: IEmployeeNid;
      };
      nid = result.data;

      // console.log("Data found", visaBrp);
    }
  } catch (err) {
    console.error("Edit Employee > Visa BRP Info > Data not found");
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">National ID Information</p>
        <NidEditDialog data={nid} employee_id={params.employeeId} />
      </div>
      <NidFormFragment data={nid} readOnly />
    </div>
  );
}
