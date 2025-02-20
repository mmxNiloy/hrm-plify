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
import { ButtonBlue } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { getFullNameOfUser } from "@/utils/Misc";
import React from "react";
import CompanyCreationDialog from "../Company/CompanyCreationDialog";
import Icons from "@/components/ui/icons";
import JoinCompanyPopover from "../../Popover/Profile/JoinCompanyPopover";
import SiteConfig from "@/utils/SiteConfig";

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
        <Button className={ButtonBlue}>Open Starter Dialog</Button>
      </DialogTrigger>
      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Welcome, {getFullNameOfUser(user)}</DialogTitle>
          <DialogDescription>
            Looks like this is you have yet to join a company. $
            {SiteConfig.siteName} offers robust solutions for your HR management
            needs. To use all of our fetures, join a company or create your own
            organization and start managing today.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-white shadow-lg aspect-video flex flex-col gap-2 bg-green-400 rounded-lg border p-4">
            <p className="bg-clip-text drop-shadow-lg text-xl">
              Create a Company
            </p>
            <p className="bg-clip-text drop-shadow-lg">
              Simplify your HR management tasks with {SiteConfig.siteName}.
              Create a profile for your organization to get started.
            </p>

            <span className="flex-grow" />

            <div className="rounded-full shadow-xl drop-shadow-lg">
              <CompanyCreationDialog asClient Icon={<Icons.badgeCheck />} />
            </div>
          </div>
          <div className="text-white shadow-lg aspect-video flex flex-col gap-2 bg-blue-400 rounded-lg border p-4">
            <p className="bg-clip-text drop-shadow-lg text-xl">
              Join a Company
            </p>
            <p className="bg-clip-text drop-shadow-lg">
              Does your organization use our solutions? Join your colleagues and
              streamline your managerial tasks today with ${SiteConfig.siteName}
              .
            </p>

            <span className="flex-grow" />

            <JoinCompanyPopover user={user} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
