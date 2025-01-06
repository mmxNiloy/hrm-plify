"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";

export default function CompanyDashboardSidebar({
  company,
  user,
}: {
  company: ICompany;
  user: IUser;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);

  return (
    <Sidebar
      open={
        open
        // || hovered
      }
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      className="overflow-auto"
    >
      <SidebarContent>
        <MySidebarHeader
          open={open}
          onClick={() => setOpen((old) => !old)}
          company={company}
        />

        <Accordion
          type="multiple"
          defaultValue={["org", "hr", "ops", "fin"]}
          onValueChange={(e) => {
            if (e.length > 0) {
              setIsAccordionOpen(true);
            } else {
              setIsAccordionOpen(false);
            }
          }}
        >
          <AccordionItem value="org">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.building />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Organization
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink href={`/dashboard/company/${company.company_id}`}>
                <Icons.home />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Organization Profile
                </span>
              </SidebarLink>

              {(user.user_roles?.roles.role_name === "Super Admin" ||
                user.user_roles?.roles.role_name === "Admin") && (
                <SidebarLink
                  href={`/dashboard/company/${company.company_id}/company-admin`}
                >
                  <Icons.adminUser />
                  <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                    Company Admin
                  </span>
                </SidebarLink>
              )}

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/department`}
              >
                <Icons.department />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Department
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/designation`}
              >
                <Icons.idCard />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Designation
                </span>
              </SidebarLink>

              {/* <SidebarLink
                href={`/dashboard/company/${company.company_id}/employment-type`}
              >
                <Icons.userCog />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Employment Type
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/pay-group`}
              >
                <Icons.employeeSalary />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Pay Group
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/annual-pay`}
              >
                <Icons.calendarMoney />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Annual Pay
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/bank`}
              >
                <Icons.landmark />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Banking
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/tax`}
              >
                <Icons.note />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Tax
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/payment-type`}
              >
                <Icons.money />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Payment Type
                </span>
              </SidebarLink> */}

              {/* <SidebarLink
                href={`/dashboard/company/${company.company_id}/wage-pay-mode`}
              >
                <Icons.pay />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Wages Pay Mode
                </span>
              </SidebarLink> */}
              {/* <Button
                variant={"ghost"}
                className="justify-start gap-2"
                disabled
              >
                <Icons.pay />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Wages Pay Mode
                </span>
              </Button> */}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hr">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.hr />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Human Resources
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/employee`}
              >
                <Icons.employees />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Employee Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/organogram`}
              >
                <Icons.chart />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Organogram Chart
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job`}
              >
                <Icons.briefcase />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Job & Recruitment
                </span>
              </SidebarLink>

              <Button
                disabled
                className="justify-start gap-2"
                variant={"ghost"}
              >
                <Icons.userKey />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  User Access Management
                </span>
              </Button>
              {/* <SidebarLink
                href={`/dashboard/company/${company.company_id}/user-access`}
              >
                <Icons.userKey />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  User Access Management
                </span>
              </SidebarLink> */}

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/leave`}
              >
                <Icons.leave />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Leave Management
                </span>
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ops">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.operations />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Operations
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/attendance`}
              >
                <Icons.usersCheck />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Attendance Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/rota`}
              >
                <Icons.cycle />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Rota
                </span>
              </SidebarLink>

              {/* <SidebarLink
                href={`/dashboard/company/${company.company_id}/task`}
              >
                <Icons.todo />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Task Management
                </span>
              </SidebarLink> */}

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/holiday`}
              >
                <Icons.clockStar />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Holiday Management
                </span>
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fin">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.statGraph />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Finance & Documents
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/payroll`}
              >
                <Icons.money />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Payroll Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/sponsor-compliance`}
              >
                <Icons.pay />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Sponsor Compliance
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/document`}
              >
                <Icons.document />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Documents
                </span>
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <BackLinkButton />
        <span className="h-8"></span>
      </SidebarContent>
    </Sidebar>
  );
}
