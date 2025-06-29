"use server";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { CompanyByIDPageProps } from "./PageProps";
import { INavItem } from "@/schema/SidebarSchema";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";

interface LayoutProps extends CompanyByIDPageProps {
  children: React.ReactNode;
}
export default async function CompanyDashboardLayout({
  children,
  params,
}: LayoutProps) {
  const [user, mParams] = await Promise.all([getCurrentUser(), params]);

  const isAdmin =
    user?.user_roles?.roles?.role_name === "Super Admin" ||
    user?.user_roles?.roles?.role_name === "Admin";
  const id = mParams.companyId;

  const navItems = [
    {
      title: "Organization",
      icon: "building",
      href: "#",
      items: [
        {
          href: `/dashboard/company/${id}`,
          title: "Dashboard",
          icon: "home",
        },
        {
          href: `/dashboard/company/${id}/profile`,
          title: "Organization Profile",
          icon: "profile",
        },
        {
          href: `/dashboard/company/${id}/company-admin`,
          title: "Company Admin",
          icon: "adminUser",
          hidden: !isAdmin,
        },
        {
          href: `/dashboard/company/${id}/department`,
          title: "Department",
          icon: "department",
        },
        {
          href: `/dashboard/company/${id}/designation`,
          title: "Designation",
          icon: "idCard",
        },
        {
          href: `/dashboard/company/${id}/employment-type`,
          title: "Employment Type",
          icon: "userCog",
        },
      ],
    },
    {
      href: "#",
      icon: "hr",
      title: "Human Resources",
      items: [
        {
          href: `/dashboard/company/${id}/employee`,
          title: "Employee Management",
          icon: "employees",
        },
        {
          href: `/dashboard/company/${id}/organogram`,
          title: "Organogram Chart",
          icon: "chart",
        },
        {
          href: `/dashboard/company/${id}/job`,
          title: "Job & Recruitment",
          icon: "briefcase",
        },
        {
          href: `/dashboard/company/${id}/user-access`,
          title: "Employee Access Management",
          icon: "userKey",
        },
        {
          href: `/dashboard/company/${id}/leave`,
          title: "Leave Management",
          icon: "leave",
        },
      ],
    },
    {
      href: "#",
      icon: "operations",
      title: "Operations",
      items: [
        {
          href: `/dashboard/company/${id}/attendance`,
          title: "Attendance Management",
          icon: "usersCheck",
        },
        {
          href: `/dashboard/company/${id}/rota`,
          title: "Rota",
          icon: "cycle",
        },
        {
          href: `/dashboard/company/${id}/holiday`,
          title: "Holiday Management",
          icon: "clockStar",
        },
      ],
    },
    {
      href: "#",
      icon: "statGraph",
      title: "Payroll",
      items: [
        {
          href: `/dashboard/company/${id}/payroll`,
          title: "Payroll Management",
          icon: "money",
        },
        {
          href: `/dashboard/company/${id}/payroll/salary-struct`,
          title: "Salary Structure",
          icon: "salary",
        },
        {
          href: `/dashboard/company/${id}/payroll/pay-group`,
          title: "Pay Group",
          icon: "group",
        },
        {
          href: `/dashboard/company/${id}/payroll/annual-pay`,
          title: "Annual Pay",
          icon: "money",
        },
        {
          href: `/dashboard/company/${id}/payroll/payment-type`,
          title: "Payment Type",
          icon: "receipt",
        },
        {
          href: `/dashboard/company/${id}/payroll/wage-payment-mode`,
          title: "Wage Payment Mode",
          icon: "category",
        },
      ],
    },
    {
      href: "#",
      icon: "dashboard",
      title: "Miscellaneous",
      items: [
        {
          href: `/dashboard/company/${id}/bank`,
          title: "Bank",
          icon: "lawBuilding",
        },
        {
          href: `/dashboard/company/${id}/tax`,
          title: "Tax",
          icon: "files",
        },
        {
          href: `/dashboard/company/${id}/sponsor-compliance`,
          title: "Sponsor Compliance",
          icon: "pay",
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
          <SidebarViewport>{children}</SidebarViewport>
        </main>
      </SidebarProvider>
    </>
  );
}
