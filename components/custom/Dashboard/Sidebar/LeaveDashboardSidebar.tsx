"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { INavAccordionItemProps } from "./NavAccordion";
import NavList from "./NavList";
import NavDrawer from "./NavDrawer";

export default function LeaveDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/leave`,
        title: "Leave Management Dashboard",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/leave/request`,
        title: "Leave Requests",
        icon: <Icons.todo />,
      },
      {
        href: `/dashboard/company/${company.company_id}/leave/type`,
        title: "Leave Type",
        icon: <Icons.category />,
      },
      {
        href: `/dashboard/company/${company.company_id}/leave/approver`,
        title: "Leave Approvers",
        icon: <Icons.userCheck />,
      },
    ],
    [company.company_id]
  );

  return (
    <>
      <NavDrawer>
        <NavList items={sidebarItems} />
      </NavDrawer>
      <Sidebar open={open}>
        <SidebarContent>
          <MySidebarHeader
            open={open}
            onClick={() => setOpen((old) => !old)}
            company={company}
          />

          <NavList items={sidebarItems} />

          {/* TODO: Future Features */}
          {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/rules`}
          >
          <Icons.lawBuilding />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
          Leave Rules
          </span>
          </SidebarLink>
          
          <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/allocation`}
          >
          <Icons.distribution />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
          Leave Allocation
          </span>
          </SidebarLink>

          <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/balance`}
        >
          <Icons.scale />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Balance
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/report`}
        >
          <Icons.note />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
          Leave Report
          </span>
        </SidebarLink> */}

          <BackLinkButton />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
