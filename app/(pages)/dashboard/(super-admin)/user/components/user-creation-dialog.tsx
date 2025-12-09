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
import { ButtonGradient } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useState } from "react";
import { IPermission } from "@/schema/UserSchema";
import { cn } from "@/lib/utils";
import { UserPlus2 } from "lucide-react";
import SystemUserCreationForm from "./user-creation-form";

interface Props {
  permissions: IPermission[];
}

export default function UserCreationDialog({ permissions }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className={cn(ButtonGradient, "gap-1 [&_svg]:size-4 text-sm")}
        >
          <UserPlus2 />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Add a System User</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
        </DialogHeader>

        <SystemUserCreationForm
          permissions={permissions}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
