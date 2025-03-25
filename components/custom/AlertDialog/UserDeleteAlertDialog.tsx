"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICompanyDoc } from "@/schema/CompanySchema";
import {
  ButtonGradient,
  ButtonSuccess,
  ButtonWarn,
} from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { upload } from "@/app/(server)/actions/upload";
import { setSourceMapsEnabled } from "process";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";
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

export default function UserDeleteAlertDialog({
  user_id,
  asIcon,
}: {
  asIcon?: boolean;
  user_id: number;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);

      const apiRes = await fetch(`/api/user`, {
        method: "DELETE",
        body: JSON.stringify({ user_id }),
      });
      setLoading(false);
      if (apiRes.ok) {
        toast({
          title: "Document Update Successful",
          className: ToastSuccess,
        });
        setOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Document Update Failed",
          variant: "destructive",
        });
      }
    },
    [user_id, router, toast]
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.trash />
          </Button>
        ) : (
          <Button variant={"destructive"} className="rounded-full">
            <Icons.trash /> Delete
          </Button>
        )}
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

        <form onSubmit={handleSubmit}>
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
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
