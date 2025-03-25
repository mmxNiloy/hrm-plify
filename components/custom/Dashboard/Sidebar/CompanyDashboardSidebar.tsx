"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SiteConfig from "@/utils/SiteConfig";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <>
      <CompanyDashboardDrawer company={company} user={user} />
      <Sidebar open={open} className="overflow-auto hidden md:block">
        <SidebarContent>
          <MySidebarHeader
            open={open}
            onClick={() => setOpen((old) => !old)}
            company={company}
          />

          <NavAccordion company={company} user={user} />

          <BackLinkButton />
          <span className="h-8"></span>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

export function CompanyDashboardDrawer({ company, user }: INavAccordionProps) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  return (
    <Drawer direction="left" open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger className="fixed top-5 left-4 z-50 md:hidden">
        <Icons.menu />
      </DrawerTrigger>

      <DrawerContent className="fixed top-0 left-0 right-auto h-screen mt-0 sm:max-w-screen-sm md:max-w-screen-md rounded-none">
        <DrawerHeader className="relative">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>
            {SiteConfig.siteName} | {company.company_name} | Main Navigation
            Menu{" "}
          </DrawerDescription>
          <DrawerClose className="absolute top-2 right-2">
            <Icons.cross />
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="h-[calc(100vh-5rem)] px-2">
          <NavAccordion
            onLinkClick={() => setOpenDrawer(false)}
            company={company}
            user={user}
          />
        </ScrollArea>

        <BackLinkButton onClick={() => setOpenDrawer(false)} />
      </DrawerContent>
    </Drawer>
  );
}

function NavAccordion({ company, user, onLinkClick }: INavAccordionProps) {
  return (
    <Accordion type="multiple" defaultValue={["org", "hr", "ops", "fin"]}>
      <AccordionItem value="org">
        <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
          <div className="flex gap-2 items-center">
            <Icons.building className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Organization
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}`}
          >
            <Icons.home />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Company Dashboard
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/profile`}
          >
            <Icons.profile />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Organization Profile
            </span>
          </SidebarLink>

          {(user.user_roles?.roles.role_name === "Super Admin" ||
            user.user_roles?.roles.role_name === "Admin") && (
            <SidebarLink
              onClick={onLinkClick}
              href={`/dashboard/company/${company.company_id}/company-admin`}
            >
              <Icons.adminUser />
              <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
                Company Admin
              </span>
            </SidebarLink>
          )}

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/department`}
          >
            <Icons.department />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Department
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/designation`}
          >
            <Icons.idCard />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Designation
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/employment-type`}
          >
            <Icons.userCog />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Employment Type
            </span>
          </SidebarLink>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="hr">
        <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
          <div className="flex gap-2 items-center">
            <Icons.hr className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Human Resources
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/employee`}
          >
            <Icons.employees />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Employee Management
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/organogram`}
          >
            <Icons.chart />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Organogram Chart
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/job`}
          >
            <Icons.briefcase />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Job & Recruitment
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/user-access`}
          >
            <Icons.userKey />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Employee Access Management
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/leave`}
          >
            <Icons.leave />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Leave Management
            </span>
          </SidebarLink>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ops">
        <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
          <div className="flex gap-2 items-center">
            <Icons.operations className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Operations
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/attendance`}
          >
            <Icons.usersCheck />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Attendance Management
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/rota`}
          >
            <Icons.cycle />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Rota
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/holiday`}
          >
            <Icons.clockStar />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Holiday Management
            </span>
          </SidebarLink>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="fin">
        <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
          <div className="flex gap-2 items-center">
            <Icons.statGraph className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Finance & Documents
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/payroll`}
          >
            <Icons.money />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Payroll Management
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/sponsor-compliance`}
          >
            <Icons.pay />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Sponsor Compliance
            </span>
          </SidebarLink>

          <SidebarLink
            onClick={onLinkClick}
            href={`/dashboard/company/${company.company_id}/document`}
          >
            <Icons.document />
            <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
              Documents
            </span>
          </SidebarLink>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
