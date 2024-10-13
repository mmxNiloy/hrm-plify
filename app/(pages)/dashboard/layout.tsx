import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
