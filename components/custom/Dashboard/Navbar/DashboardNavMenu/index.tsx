import React from "react";
import SuperAdminNavMenu from "./SuperAdminNavMenu";
import CompanyAdminNavMenu from "./CompanyAdminNavMenu";
import EmployeeNavMenu from "./EmployeeNavMenu";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { notFound } from "next/navigation";

export default async function DashboardNavMenu({
  company,
  user,
}: {
  company?: ICompany;
  user: IUser;
}) {
  const role = user.user_roles?.roles?.role_name;

  if (role === "Super Admin" || role === "Admin") {
    return <SuperAdminNavMenu />;
  } else if (role === "Company Admin") {
    if (!company) notFound();
    return <CompanyAdminNavMenu user={user} company={company} />;
  }
  return <EmployeeNavMenu user={user} company={company} />;
}
