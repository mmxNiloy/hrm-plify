"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { notFound, redirect } from "next/navigation";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import EmployeeHomeSidebar from "@/components/custom/Dashboard/Sidebar/EmployeeHomeSidebar";

export default async function EmployeeHomeSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;
  const [employee, company] = await Promise.all([
    getEmployeeData(),
    getCompanyData(companyId),
    // didAttendToday(),
  ]);

  if (employee.error || company.error) {
    return notFound();
  }

  if (
    employee.data.role_name === "Admin" ||
    employee.data.role_name === "Super Admin"
  ) {
    redirect("/dashboard?_ref=role-mismatch");
  }

  if (!employee.data.data) {
    redirect("/api/logout?_ref=data-not-found");
  }

  return <EmployeeHomeSidebar company={company.data} />;
}
