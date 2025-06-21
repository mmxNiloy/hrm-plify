import React from "react";
import SuperAdminDashboardLayout from "../../(super-admin)/layout";

export default function SuperAdminCompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminDashboardLayout>{children}</SuperAdminDashboardLayout>;
}
