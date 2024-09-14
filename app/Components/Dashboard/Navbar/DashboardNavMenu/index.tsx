"use server";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import SuperAdminNavMenu from "./SuperAdminNavMenu";
import CompanyAdminNavMenu from "./CompanyAdminNavMenu";
import EmployeeNavMenu from "./EmployeeNavMenu";

export default async function DashboardNavMenu() {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const role = user.user_roles?.roles.role_name;

  if (role === "Super Admin" || role === "Admin") {
    return <SuperAdminNavMenu />;
  } else if (role === "Company Admin") {
    return <CompanyAdminNavMenu user={user} />;
  }
  return <EmployeeNavMenu user={user} />;
}
