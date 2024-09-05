import EmployeeDrawer from "@/app/Components/Dashboard/Employee/EmployeeDrawer";
import { LayoutProps } from "@/utils/Types";
import React from "react";

interface Props extends LayoutProps {
  params: {
    id: number;
  };
}

export default function EmployeeLayout({ children, params }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <EmployeeDrawer companyId={params.id} />
      {children}
    </div>
  );
}
