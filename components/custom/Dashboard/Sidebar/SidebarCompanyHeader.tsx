import React from "react";
import { SidebarHeader } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  company: ICompany;
}

const SidebarCompanyHeader = React.forwardRef<HTMLDivElement, Props>(
  ({ open, company, ...props }, ref) => (
    <SidebarHeader
      // ref={ref}
      title={company.company_name}
      className={cn(
        "text-white from-blue-400 to-emerald-500 bg-gradient-to-b space-y-0 cursor-pointer flex flex-row gap-2 items-center justify-center rounded-md mb-4",
        props.className
      )}
      {...props}
    >
      <p
        className={cn(
          "flex-grow font-semibold line-clamp-1 text-ellipsis max-w-44 2xl:max-w-80",
          open ? "" : "hidden"
        )}
      >
        {company.company_name}
      </p>
      <span className="size-10 flex relative rounded-full items-center justify-center">
        <Icons.chevronLeft
          className={cn(
            "absolute transition-all",
            open ? "rotate-0 scale-100" : "rotate-180 scale-0"
          )}
        />
        <Icons.chevronRight
          className={cn(
            "transition-all",
            open ? "rotate-180 scale-0" : "rotate-0 scale-100"
          )}
        />
      </span>
    </SidebarHeader>
  )
);
SidebarCompanyHeader.displayName = "SidebarCompanyHeader";
export default SidebarCompanyHeader;
