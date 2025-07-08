"use server";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";
import { INavItem } from "@/schema/SidebarSchema";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface LayoutProps extends CompanyIDURLParamSchema {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
  stats: React.ReactNode;
  pageTitle: React.ReactNode;
  actions: React.ReactNode;
}
export default async function EmployeeDashboardLayout({
  children,
  breadcrumbs,
  stats,
  pageTitle,
  actions,
  params,
}: LayoutProps) {
  // const [user, mParams] = await Promise.all([getCurrentUser(), params]);
  const mParams = await params;

  // const isAdmin =
  //   user?.user_roles?.roles?.role_name === "Super Admin" ||
  //   user?.user_roles?.roles?.role_name === "Admin";
  const id = mParams.companyId;

  const navItems = [
    {
      title: "Employee Management",
      icon: "users",
      href: "#",
      items: [
        {
          href: `/dashboard/company/${id}/employee`,
          title: "Dashboard",
          icon: "home",
        },
        {
          href: `/dashboard/company/${id}/employee/list`,
          title: "Employees",
          icon: "users",
        },
        {
          href: `/dashboard/company/${id}/employee/staff-report`,
          title: "Staff Report",
          icon: "files",
        },
        {
          href: `/dashboard/company/${id}/employee/change-of-circumstances`,
          title: "Change of Circumstances",
          icon: "history",
        },
      ],
    },
  ] satisfies INavItem[];

  return (
    <>
      <SidebarProvider>
        <AppSidebar navItems={navItems} companyId={id} />

        <main className="w-screen">
          <DashboardNavbar />
          <SidebarViewport>
            <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
              {pageTitle}

              <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
                {breadcrumbs}
              </Suspense>

              <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
                {actions}
              </Suspense>

              {children}

              <Suspense fallback={<DataTableSkeleton columns={3} />}>
                {stats}
              </Suspense>
            </main>
          </SidebarViewport>
        </main>
      </SidebarProvider>
    </>
  );
}
