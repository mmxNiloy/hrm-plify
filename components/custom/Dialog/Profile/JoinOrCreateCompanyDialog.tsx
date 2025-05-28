"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUser } from "@/schema/UserSchema";
import { ButtonGradient } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { getFullNameOfUser } from "@/utils/Misc";
import React from "react";
import CompanyCreationDialog from "../Company/CompanyCreationDialog";
import Icons from "@/components/ui/icons";
import JoinCompanyPopover from "../../Popover/Profile/JoinCompanyPopover";
import SiteConfig from "@/utils/SiteConfig";
import { cn } from "@/lib/utils";

export default function JoinOrCreateCompanyDialog({
  defaultOpen = false,
  user,
}: {
  defaultOpen?: boolean;
  user: IUser;
}) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild className="sr-only">
        <Button className={ButtonGradient}>Open Starter Dialog</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          DialogContentWidth,
          "max-w-[90vw] sm:max-w-2xl p-4 sm:p-6"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Welcome, {getFullNameOfUser(user)}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Looks like you have yet to join a company. {SiteConfig.appName}{" "}
            offers robust solutions for your HR management needs. To use all of
            our features, join a company or create your own organization and
            start managing today.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="text-white shadow-lg flex flex-col gap-3 bg-green-400 rounded-lg border p-3 sm:p-4 min-h-[200px] sm:min-h-[250px]">
            <p className="bg-clip-text drop-shadow-lg text-lg sm:text-xl font-semibold">
              Create a Company
            </p>
            <p className="bg-clip-text drop-shadow-lg text-sm sm:text-base flex-grow">
              Simplify your HR management tasks with {SiteConfig.appName}.
              Create a profile for your organization to get started.
            </p>
            <div className="rounded-full shadow-xl drop-shadow-lg self-start">
              <CompanyCreationDialog
                asClient
                Icon={<Icons.badgeCheck className="size-4 sm:size-5" />}
              />
            </div>
          </div>
          <div className="text-white shadow-lg flex flex-col gap-3 bg-blue-400 rounded-lg border p-3 sm:p-4 min-h-[200px] sm:min-h-[250px]">
            <p className="bg-clip-text drop-shadow-lg text-lg sm:text-xl font-semibold">
              Join a Company
            </p>
            <p className="bg-clip-text drop-shadow-lg text-sm sm:text-base flex-grow">
              Does your organization use our solutions? Join your colleagues and
              streamline your managerial tasks today with {SiteConfig.appName}.
            </p>
            <JoinCompanyPopover user={user} className="self-start w-auto" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
