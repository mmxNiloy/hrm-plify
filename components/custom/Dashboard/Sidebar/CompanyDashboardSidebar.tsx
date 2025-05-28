"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import SiteConfig from "@/utils/SiteConfig";
import NavDrawer from "./NavDrawer";
import NavAccordion, { INavAccordionSectionProps } from "./NavAccordion";

interface INavAccordionProps {
  company: ICompany;
  user: IUser;
  onLinkClick?: () => void;
}

export default function CompanyDashboardSidebar({
  company,
  user,
}: INavAccordionProps) {
  const [open, setOpen] = useState<boolean>(true);

  const CompanyDashboardSidebarItems = useMemo(
    (): INavAccordionSectionProps[] => [
      {
        value: "org",
        icon: <Icons.building />,
        title: "Organization",
        children: [
          {
            href: `/dashboard/company/${company.company_id}`,
            title: "Company Dashboard",
            icon: <Icons.home />,
          },
          {
            href: `/dashboard/company/${company.company_id}/profile`,
            title: "Organization Profile",
            icon: <Icons.profile />,
          },
          {
            href: `/dashboard/company/${company.company_id}/company-admin`,
            title: "Company Admin",
            icon: <Icons.adminUser />,
            hidden: !(
              user.user_roles?.roles.role_name === "Super Admin" ||
              user.user_roles?.roles.role_name === "Admin"
            ),
          },
          {
            href: `/dashboard/company/${company.company_id}/department`,
            title: "Department",
            icon: <Icons.department />,
          },
          {
            href: `/dashboard/company/${company.company_id}/designation`,
            title: "Designation",
            icon: <Icons.idCard />,
          },
          {
            href: `/dashboard/company/${company.company_id}/employment-type`,
            title: "Employment Type",
            icon: <Icons.userCog />,
          },
        ],
      },
      {
        value: "hr",
        icon: <Icons.hr />,
        title: "Human Resources",
        children: [
          {
            href: `/dashboard/company/${company.company_id}/employee`,
            title: "Employee Management",
            icon: <Icons.employees />,
          },
          {
            href: `/dashboard/company/${company.company_id}/organogram`,
            title: "Organogram Chart",
            icon: <Icons.chart />,
          },
          {
            href: `/dashboard/company/${company.company_id}/job`,
            title: "Job & Recruitment",
            icon: <Icons.briefcase />,
          },
          {
            href: `/dashboard/company/${company.company_id}/user-access`,
            title: "Employee Access Management",
            icon: <Icons.userKey />,
          },
          {
            href: `/dashboard/company/${company.company_id}/leave`,
            title: "Leave Management",
            icon: <Icons.leave />,
          },
        ],
      },
      {
        value: "ops",
        icon: <Icons.operations />,
        title: "Operations",
        children: [
          {
            href: `/dashboard/company/${company.company_id}/attendance`,
            title: "Attendance Management",
            icon: <Icons.usersCheck />,
          },
          {
            href: `/dashboard/company/${company.company_id}/rota`,
            title: "Rota",
            icon: <Icons.cycle />,
          },
          {
            href: `/dashboard/company/${company.company_id}/holiday`,
            title: "Holiday Management",
            icon: <Icons.clockStar />,
          },
        ],
      },
      {
        value: "fin",
        icon: <Icons.statGraph />,
        title: "Finance & Documents",
        children: [
          {
            href: `/dashboard/company/${company.company_id}/payroll`,
            title: "Payroll Management",
            icon: <Icons.money />,
          },
          {
            href: `/dashboard/company/${company.company_id}/sponsor-compliance`,
            title: "Sponsor Compliance",
            icon: <Icons.pay />,
          },
          {
            href: `/dashboard/company/${company.company_id}/document`,
            title: "Documents",
            icon: <Icons.document />,
          },
        ],
      },
    ],
    [company.company_id, user.user_roles?.roles.role_name]
  );

  const CompanyDashboardSidebarItemsDefaultValues = useMemo(
    () => ["org", "hr", "ops", "fin"],
    []
  );

  return (
    <>
      <NavDrawer
        description={`${SiteConfig.appName} | ${company.company_name}`}
      >
        <NavAccordion
          items={CompanyDashboardSidebarItems}
          defaultValue={CompanyDashboardSidebarItemsDefaultValues}
        />
      </NavDrawer>
      <Sidebar open={open}>
        <SidebarContent>
          <MySidebarHeader
            open={open}
            onClick={() => setOpen((old) => !old)}
            company={company}
          />

          <NavAccordion
            items={CompanyDashboardSidebarItems}
            defaultValue={CompanyDashboardSidebarItemsDefaultValues}
          />

          <BackLinkButton />
          <span className="h-8"></span>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
