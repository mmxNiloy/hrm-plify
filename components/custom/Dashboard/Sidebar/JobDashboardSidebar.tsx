"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import NavAccordion, {
  INavAccordionItemProps,
  INavAccordionSectionProps,
} from "./NavAccordion";
import NavDrawer from "./NavDrawer";
import NavList from "./NavList";

export default function JobDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/job`,
        title: "Job & Recruitment Dashboard",
        icon: <Icons.home />,
      },
    ],
    [company.company_id]
  );

  const accordionItems = useMemo(
    (): INavAccordionSectionProps[] => [
      {
        value: "job",
        icon: <Icons.briefcase />,
        title: "Job",
        children: [
          {
            href: `/dashboard/company/${company.company_id}/job/all`,
            title: "Job Listings",
            icon: <Icons.list />,
          },
          {
            href: `/dashboard/company/${company.company_id}/job/applied`,
            title: "Job Applications",
            icon: <Icons.usersCheck />,
          },
          {
            href: `/dashboard/company/${company.company_id}/job/short-listing`,
            title: "Shortlisted Applicants",
            icon: <Icons.userSearch />,
          },
          {
            href: `/dashboard/company/${company.company_id}/job/hired`,
            title: "Hired",
            icon: <Icons.handshake />,
          },
          {
            href: `/dashboard/company/${company.company_id}/job/rejected`,
            title: "Rejected",
            icon: <Icons.userX />,
          },
        ],
      },
    ],
    [company.company_id]
  );

  const accordionDefaultValues = useMemo(() => ["job"], []);

  return (
    <>
      <NavDrawer>
        <NavList items={sidebarItems} />
        <NavAccordion
          defaultValue={accordionDefaultValues}
          items={accordionItems}
        />
      </NavDrawer>
      <Sidebar className="overflow-auto" open={open}>
        <SidebarContent>
          <MySidebarHeader
            open={open}
            onClick={() => setOpen((old) => !old)}
            company={company}
          />

          <NavList items={sidebarItems} />
          {/* Jobs Navigation */}
          <NavAccordion
            defaultValue={accordionDefaultValues}
            items={accordionItems}
          />

          {/* <SidebarLink
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
        </SidebarLink> */}

          {/* Mock Interview Accordion */}
          {/* {!(open || hovered) && (
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
        </SidebarLink> */}
          <BackLinkButton />
          <span className="h-8"></span>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
