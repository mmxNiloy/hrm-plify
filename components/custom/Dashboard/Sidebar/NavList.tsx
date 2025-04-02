"use client";

import { SidebarLink } from "./Sidebar";
import React, { useCallback } from "react";
import useNavDrawerControls from "@/hooks/useNavDrawerControls";
import { INavAccordionItemProps } from "./NavAccordion";

export interface INavAccordionProps {
  items: INavAccordionItemProps[];
}

export default function NavList({ items }: INavAccordionProps) {
  const { closeDrawer } = useNavDrawerControls();

  const handleLinkClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return (
    <div className="flex flex-col gap-2 md:gap-4 p-2 md:p-4">
      {items.map((item, idx) => {
        if (item.hidden) return null;

        return (
          <SidebarLink
            key={`nav-list-child-${idx}`}
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
    </div>
  );
}
