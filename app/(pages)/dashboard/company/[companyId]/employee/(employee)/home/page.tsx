"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { Button } from "@/components/ui/button";
import { ButtonBlue, ButtonWarn } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function EmployeeUserHome({
  params,
}: CompanyByIDPageProps) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const [employee, company] = await Promise.all([
    getEmployeeData(),
    getCompanyData((await params).companyId),
  ]);

  if (employee.error || company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Home</p>
        <ErrorFallbackCard error={employee.error ?? company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Home</p>
      <p className="text-xl font-semibold">
        Welcome, {getFullNameOfEmployee(employee.data.data!)}!
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 border rounded-lg drop-shadow-md">
          <Label className="text-amber-500">
            You&apos;ve have yet to record attendance today.
          </Label>
          <Button className={ButtonWarn}>
            <Icons.check />
            Record Attendance
          </Button>
        </div>
        <div className="flex gap-2 p-4 border rounded-lg drop-shadow-md">
          <p className="font-semibold flex items-center">
            <Icons.user />
            My Profile
          </p>
        </div>
      </div>

      <p className="text-xl font-bold">Work In Progress (WIP)</p>
    </main>
  );
}
