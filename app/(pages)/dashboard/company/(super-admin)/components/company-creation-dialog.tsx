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
import Icons from "@/components/ui/icons";
import { ButtonGradient } from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CompanyProfileForm from "./company-profile-form";

export default function CompanyCreationDialog({
  asClient = false,
  hasPermission = false,
  Icon,
}: {
  asClient?: boolean;
  hasPermission?: boolean;
  Icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={asClient ? "default" : "sm"}
          className={cn(ButtonGradient, asClient ? "w-full" : "")}
        >
          {Icon ? <>{Icon}</> : <Icons.plus />} Create a Company
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle className={DialogTitleStyles}>
            <Icons.company /> Create a Company
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
        </DialogHeader>

        <CompanyProfileForm asClient={asClient} hasPermission={hasPermission} />
      </DialogContent>
    </Dialog>
  );
}
