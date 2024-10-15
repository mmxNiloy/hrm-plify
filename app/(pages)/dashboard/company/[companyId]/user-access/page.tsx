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
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { CompanyByIDPageProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import WIPPage from "@/components/custom/Placeholder/WIPPage";

export default async function UserAccessDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">User Access Management</p>
      <MyBreadcrumbs company={company} user={user} title="User Access" />

      <WIPPage />
    </main>
  );
}
