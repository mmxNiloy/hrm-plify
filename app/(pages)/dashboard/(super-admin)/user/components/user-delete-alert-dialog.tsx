"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteSystemUser from "@/app/(server)/actions/user/system-user/delete-system-user.controller";
import { toast } from "sonner";

interface Props extends ButtonProps {
  userId: number;
}

const UserDeleteAlertDialog = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, userId, ...props }, ref) => {
    const [loading, startDelete] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleDelete = useCallback(() => {
      startDelete(async () => {
        const result = await deleteSystemUser(userId);
        if (result.error) {
          toast.error("Failed to delete the user!");
        } else {
          toast.success("User deleted!");

          setOpen(false);
          router.refresh();
        }
      });
    }, [router, userId]);
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className={className} ref={ref} {...props}></Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user?
              <br />
              <em>This action is irreversible.</em>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading}
              className="bg-stone-600 hover:bg-stone-500 rounded-full hover:text-white text-white"
            >
              <Icons.cross /> Cancel
            </AlertDialogCancel>

            <Button
              disabled={loading}
              variant={"destructive"}
              size={"sm"}
              className="rounded-full"
              onClick={handleDelete}
            >
              {loading ? (
                <>
                  <Icons.spinner className="animate-spin ease-in-out" />
                  Deleting...
                </>
              ) : (
                <>
                  <Icons.trash /> Proceed
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
UserDeleteAlertDialog.displayName = "UserDeleteAlertDialog";

export default UserDeleteAlertDialog;
