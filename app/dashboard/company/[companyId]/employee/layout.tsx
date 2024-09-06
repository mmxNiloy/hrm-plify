import EmployeeDrawer from "@/app/Components/Dashboard/Employee/EmployeeDrawer";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default function EmployeeLayout({ children, params }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <EmployeeDrawer companyId={params.companyId} />
      {children}
    </div>
  );
}
