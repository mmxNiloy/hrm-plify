import EmployeeDrawer from "@/app/Components/Dashboard/Employee/EmployeeDrawer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LayoutProps } from "@/utils/Types";
import React from "react";

export default function EmployeeLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-row gap-2">
      <EmployeeDrawer />
      {children}
    </div>
  );
}
