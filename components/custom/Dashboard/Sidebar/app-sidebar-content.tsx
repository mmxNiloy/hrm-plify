import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { INavItem } from "@/schema/SidebarSchema";
import React from "react";
import SidebarLink from "./sidebar-link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SiteConfig from "@/utils/SiteConfig";

export default function AppSidebarContent({
  navItems,
}: {
  navItems: INavItem[];
}) {
  return (
    <div className="flex-1">
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Sidebar Navigation */}
            {navItems.map((group) => {
              if (group.hidden) return null;

              if (!group.items || group.items.length < 1) {
                return (
                  <SidebarMenuItem key={group.title}>
                    <SidebarMenuButton asChild>
                      <SidebarLink data={group} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  className="group/collapsible"
                  key={group.title}
                  asChild
                  defaultOpen={
                    group.open ?? !SiteConfig.featureFlags.defaultCollapse
                  }
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <SidebarLink data={group} asCollapsibleTrigger />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="px-1">
                        {group.items.map((item) => {
                          if (item.hidden) return null;

                          return (
                            <SidebarMenuSubItem
                              key={item.title}
                              hidden={item.hidden}
                            >
                              <SidebarMenuSubButton className="px-1">
                                <SidebarLink className="text-xs" data={item} />
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
