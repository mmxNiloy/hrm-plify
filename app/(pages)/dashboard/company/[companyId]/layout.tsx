"use server";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { CompanyByIDPageProps } from "./PageProps";

interface LayoutProps extends CompanyByIDPageProps {
  children: React.ReactNode;
}
export default async function CompanyDashboardLayout({
  children,
  params,
}: LayoutProps) {
  const mParams = await params;

  return (
    <>
      <SidebarProvider>
        <AppSidebar companyId={mParams.companyId} />

        <main>
          <DashboardNavbar />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
