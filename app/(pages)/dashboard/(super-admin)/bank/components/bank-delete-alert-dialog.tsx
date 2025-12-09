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
import deleteBank from "@/app/(server)/actions/bank/delete-bank.controller";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps {
  bankId: number;
}

const BankDeleteAlertDialog = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, bankId, ...props }, ref) => {
    const [loading, startDelete] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleDelete = useCallback(() => {
      startDelete(async () => {
        const result = await deleteBank(bankId);
        if (result.error) {
          toast.error("Failed to delete the bank!");
        } else {
          toast.success("bank deleted!");

          setOpen(false);
          router.refresh();
        }
      });
    }, [router, bankId]);
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5",
              className
            )}
            ref={ref}
            {...props}
          ></Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bank?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bank?
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
BankDeleteAlertDialog.displayName = "BankDeleteAlertDialog";

export default BankDeleteAlertDialog;
