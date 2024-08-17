import { LayoutProps } from "@/utils/Types";
import React from "react";
import DashboardNavbar from "../Components/Dashboard/Navbar/DashboardNavbar";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
