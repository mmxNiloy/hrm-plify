"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useState } from "react";
import { IPermission, IUser } from "@/schema/UserSchema";
import SystemUserEditForm from "./user-edit-form";

interface Props extends ButtonProps {
  permissions: IPermission[];
  data: IUser;
}

const UserEditDialog = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, permissions, data, ...props }, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button ref={ref} className={className} {...props}></Button>
        </DialogTrigger>

        <DialogContent className={DialogContentWidth}>
          <DialogHeader>
            <DialogTitle>Update a System User</DialogTitle>
            <DialogDescription>
              Fill out the form appropriately.
            </DialogDescription>
          </DialogHeader>

          <SystemUserEditForm
            data={data}
            permissions={permissions}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }
);

UserEditDialog.displayName = "UserEditDialog";

export default UserEditDialog;
