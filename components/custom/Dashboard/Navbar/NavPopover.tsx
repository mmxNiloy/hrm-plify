"use server";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, UserCircle2 } from "lucide-react";
import React, { Suspense } from "react";
import NavProfile from "./NavProfile";
import { Skeleton } from "@/components/ui/skeleton";

export default async function NavPopover() {
  const user = await getCurrentUser();
  const employeeData = await getEmployeeData();
  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger className="group flex gap-1 items-center">
        <GradientBorderContainer className="flex items-center justify-center rounded-full">
          <AvatarPicker
            readOnly
            src={employeeData.data?.data?.image}
            className="size-6 p-0"
            skeleton={<UserCircle2 className="size-6" />}
          />
        </GradientBorderContainer>
        <p className="w-fit md:w-32 hidden md:block text-start line-clamp-1 text-ellipsis">
          {user.first_name} {user.last_name}
        </p>
        <ChevronDown className="bg-site-gradient-lmr text-[#bd1cc2] bg-clip-text size-4 rotate-0 group-data-[state=open]:rotate-180 transition-all" />
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex flex-col gap-2">
          <Suspense fallback={<Skeleton className="size-64" />}>
            <NavProfile user={user} employeeData={employeeData.data?.data} />
          </Suspense>
        </div>
      </PopoverContent>
    </Popover>
  );
}
