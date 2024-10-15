"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonBlue } from "@/styles/button.tailwind";
import React from "react";
import Link from "next/link";
import ShiftManagementDataTable from "@/components/custom/DataTable/Rota/ShiftManagementDataTable";
import OffDaysDataTable from "@/components/custom/DataTable/Rota/OffDaysDataTable";
import DutyRosterDataTable from "@/components/custom/DataTable/Rota/DutyRosterDataTable";
import { CompanyByIDPageProps } from "../PageProps";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getShifts } from "@/app/(server)/actions/getShifts";
import { getOffDays } from "@/app/(server)/actions/getOffDays";
import { getDutyRosters } from "@/app/(server)/actions/getDutyRosters";
import WIPPage from "@/components/custom/Placeholder/WIPPage";

export default async function RotaDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Rota</p>

      <MyBreadcrumbs company={company} user={user} title="Rota" />

      <WIPPage />
    </main>
  );
}
