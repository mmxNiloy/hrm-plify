"use server";
import { IEmployeeEussDbsData } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import EussFormFragment from "@/app/Components/Employee/EditDialog/EussDbsEditDialog/FormFragment/EussFormFragment";
import DbsFormFragment from "@/app/Components/Employee/EditDialog/EussDbsEditDialog/FormFragment/DbsFormFragment";
import EussDbsEditDialog from "@/app/Components/Employee/EditDialog/EussDbsEditDialog";

export default async function EussDetailsSlot({
  params,
}: EditEmployeeByIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var euss: IEmployeeEussDbsData | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-euss-dbs-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > EUSS DBS Info > Data not found");
      redirect("/not-found");
    } else {
      const result = (await apiRes.json()) as {
        message: string;
        data?: IEmployeeEussDbsData;
      };
      euss = result.data;

      //   console.log("Data found", visaBrp);
    }
  } catch (err) {
    console.error("Edit Employee > EUSS DBS Info > Data not found");
    redirect("/not-found");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">EUSS/Time Limit Information</p>
          <EussDbsEditDialog data={euss} employee_id={params.employeeId} />
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
