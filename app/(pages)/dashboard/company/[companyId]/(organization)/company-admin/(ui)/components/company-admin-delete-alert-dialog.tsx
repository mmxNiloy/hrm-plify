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
import React, { useCallback, useState, useTransition } from "react";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCompanyAdmin } from "@/app/(server)/actions/company/admin/delete-company-admin.controller";

interface Props {
  user_id: number;
}

export default function CompanyAdminDeleteAlertDialog({ user_id }: Props) {
  const [updating, startUpdate] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    startUpdate(async () => {
      try {
        const result = await deleteCompanyAdmin(user_id);

        if (result.error) {
          toast.error("Failed to delete company admin.");
          return;
        }

        toast.success("Company admin deleted!");
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete company admin.");
      }
    });
  }, [user_id, router]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="sm"
          className="text-red-500 hover:text-red-500/90 w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
        >
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="flex gap-1 items-center">
              <Trash2 />
              Delete Company Admin
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this company admin?
            <br />
            <em>This action is irreversible.</em>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={updating}
            className="bg-stone-600 hover:bg-stone-500 rounded-full hover:text-white text-white"
          >
            <Icons.cross /> Cancel
          </AlertDialogCancel>

          <Button
            onClick={handleSubmit}
            disabled={updating}
            variant={"destructive"}
            size={"sm"}
            className="rounded-full"
          >
            {updating ? (
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
