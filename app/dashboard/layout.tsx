import { LayoutProps } from "@/utils/Types";
import React from "react";
import DashboardNavbar from "../Components/Dashboard/Navbar/DashboardNavbar";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <DashboardNavbar />
      {children}
    </div>
  );
}
