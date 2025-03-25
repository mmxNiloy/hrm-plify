import React from "react";
import { SidebarHeader } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  open?: boolean;
  hover?: boolean;
  onClick?: () => void;
  user?: IUser;
  company?: ICompany;
}

export default function MySidebarHeader({
  open,
  user,
  company,
  onClick,
  hover,
}: Props) {
  if (company) {
    return (
      <SidebarHeader
        onClick={onClick}
        title={company.company_name}
        className={
          "bg-accent space-y-0 cursor-pointer flex flex-row gap-2 items-center justify-center rounded-md"
        }
      >
        <p
          className={cn(
            "flex-grow font-semibold line-clamp-1 text-ellipsis max-w-44 2xl:max-w-80",
            open
              ? //  || hovered
                ""
              : "hidden"
          )}
        >
          {company.company_name}
        </p>
        <span className="size-10 flex relative rounded-full items-center justify-center">
          <Icons.chevronLeft
            className={cn(
              "absolute transition-all text-[#bd1cc2]",
              open ? "rotate-0 scale-100" : "rotate-180 scale-0"
            )}
          />
          <Icons.chevronRight
            className={cn(
              "transition-all text-[#bd1cc2]",
              open ? "rotate-180 scale-0" : "rotate-0 scale-100"
            )}
          />
        </span>
      </SidebarHeader>
    );
  }

  if (user) {
    return (
      <SidebarHeader
        onClick={onClick}
        title={`${user?.first_name} ${user?.last_name}`}
        className={
          "bg-accent space-y-0 cursor-pointer flex flex-row gap-2 items-center justify-center rounded-md"
        }
      >
        <Icons.user className={open || hover ? "" : "hidden"} />
        <p
          className={cn(
            "text-blue-500 flex-grow font-semibold line-clamp-1 text-ellipsis max-w-44 2xl:max-w-80",
            open || hover ? "" : "hidden"
          )}
        >
          {`${user?.first_name} ${user?.last_name}`}
        </p>
        <span className="size-10 flex relative rounded-full items-center justify-center">
          <Icons.chevronLeft
            className={cn(
              "absolute transition-all text-[#bd1cc2]",
              open ? "rotate-0 scale-100" : "rotate-180 scale-0"
            )}
          />
          <Icons.chevronRight
            className={cn(
              "transition-all text-[#bd1cc2]",
              open ? "rotate-180 scale-0" : "rotate-0 scale-100"
            )}
          />
        </span>
      </SidebarHeader>
    );
  }

  return (
    <Link href="." passHref>
      <Button variant={"link"} className="gap-2" size={"sm"}>
        <Icons.chevronLeft />
        Back
      </Button>
    </Link>
  );
}
