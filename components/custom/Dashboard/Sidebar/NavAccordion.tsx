"use client";

import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarLink } from "./Sidebar";
import React, { useCallback } from "react";
import Icons from "@/components/ui/icons";
import useNavDrawerControls from "@/hooks/useNavDrawerControls";

interface INavAccordionItemBaseProps {
  value: string;
  icon?: React.JSX.Element;
  title?: string;
}

export interface INavAccordionItemProps
  extends Omit<INavAccordionItemBaseProps, "value"> {
  href: string;
  title: string;
  hidden?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface INavAccordionSectionProps extends INavAccordionItemBaseProps {
  children?: INavAccordionItemProps[];
}

export interface INavAccordionProps {
  defaultValue?: string[];
  items: INavAccordionSectionProps[];
}

export default function NavAccordion({
  defaultValue,
  items,
}: INavAccordionProps) {
  const { closeDrawer } = useNavDrawerControls();

  const handleLinkClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return (
    <Accordion type="multiple" defaultValue={defaultValue}>
      {items.map((section, index) => (
        <AccordionItem
          value={section.value}
          key={`nav-accordion-section-${index}-${section.value}`}
        >
          <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
            <div className="flex gap-2 items-center">
              <span className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 shrink-0 *:h-4 *:w-4 *:lg:h-5 *:lg:w-5 *:xl:h-6 *:xl:w-6 *:shrink-0">
                {section.icon}
              </span>
              <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
                {section.title ?? "Untitled"}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
            {section.children?.map((item, idx) => {
              if (item.hidden) return null;
              return (
                <SidebarLink
                  key={`nav-accordion-section-${index}-child-${idx}`}
                  onClick={handleLinkClick}
                  href={item.href}
                >
                  {item.icon}
                  <span className="text-xs sm:text-sm lg:text-base transition-all group-data-[state=closed]/sidebar:hidden">
                    {item.title}
                  </span>
                </SidebarLink>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
