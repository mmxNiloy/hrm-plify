"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function JobDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const path = usePathname();
  const [isAccordionOpen, setIsAccordionOpen] = useState<number>(0);

  return (
    <Sidebar
      className="overflow-auto"
      open={
        open
        // || hovered
      }
      // onMouseEnter={(e) => setHovered(true)}
      // onMouseLeave={(e) => setHovered(false)}
    >
      <SidebarContent>
        <MySidebarHeader
          open={open}
          onClick={() => setOpen((old) => !old)}
          company={company}
        />

        <SidebarLink href={`/dashboard/company/${company.company_id}/job`}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Job & Recruitment Dashboard
          </span>
        </SidebarLink>

        {/* Jobs Navigation */}
        <Accordion
          type="single"
          collapsible
          defaultValue={
            path.search(`/dashboard/company/${company.company_id}/job/`) >= 0
              ? "job"
              : ""
          }
          onValueChange={(e) => {
            if (e.length > 0) {
              setIsAccordionOpen((oldValue) => oldValue | 1);
            } else {
              setIsAccordionOpen((oldValue) => oldValue & 2);
            }
          }}
        >
          <AccordionItem value="job">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.briefcase />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Job
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/all`}
              >
                Job List
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/posting`}
              >
                Job Posting
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/published`}
              >
                Job Published
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/applied`}
              >
                Job Applied
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/short-listing`}
              >
                Short Listing
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/interview`}
              >
                Interview
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/hired`}
              >
                Hired
              </SidebarLink>
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/rejected`}
              >
                Rejected
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/job/offer-letter`}
        >
          <Icons.mail />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Generate Offer Letter
          </span>
        </SidebarLink>
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/job/search`}
        >
          <Icons.search />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Search
          </span>
        </SidebarLink>
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/job/status-search`}
        >
          <Icons.handshake />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Status Search
          </span>
        </SidebarLink>

        {/* Mock Interview Accordion */}
        {!(open || hovered) && (
          <Button
            variant={"ghost"}
            className={cn(
              "w-full gap-4 hover:underline justify-center transition-all group-data-[state=open]/sidebar:justify-start",
              path.search(
                `/dashboard/company/${company.company_id}/job/mock-interview/`
              ) >= 0
                ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
                : ""
            )}
          >
            <Icons.presentation />
          </Button>
        )}
        <Accordion
          type="single"
          collapsible
          defaultValue={
            path.search(
              `/dashboard/company/${company.company_id}/job/mock-interview/`
            ) >= 0
              ? "mock-interview"
              : ""
          }
          onValueChange={(e) => {
            if (e.length > 0) {
              setIsAccordionOpen((oldValue) => oldValue | 2);
            } else {
              setIsAccordionOpen((oldValue) => oldValue & 1);
            }
          }}
        >
          <AccordionItem value="mock-interview">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.todo />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Mock Interview
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/mock-interview`}
              >
                Mock Interview
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/interview-forms`}
              >
                Interview Forms
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/capstone-assessment-report`}
              >
                Capstone Assessment Report
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job/cognitive-ability-assessment-report`}
              >
                Cognitive Ability Assessment Report
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/job/message-center`}
        >
          <Icons.chat />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Message Center
          </span>
        </SidebarLink>
        <BackLinkButton />
        <span className="h-8"></span>
      </SidebarContent>
    </Sidebar>
  );
}
