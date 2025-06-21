import Icons from "@/components/ui/icons";
import React from "react";

export interface INavItem {
  title: string;
  icon?: keyof typeof Icons;
  href: string;
  hidden?: boolean;
  disabled?: boolean;
  open?: boolean;
  items?: INavItem[];
}
