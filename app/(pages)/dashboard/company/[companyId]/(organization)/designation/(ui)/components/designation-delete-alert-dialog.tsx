"use client";
import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import deleteDesignation from "@/app/(server)/actions/company/designation/delete-designation.controller";

interface Props {
  designationId: number;
  onSuccess?: () => void;
}

export default function DesignationDeleteAlertDialog({
  designationId,
  onSuccess,
}: Props) {
  const [updating, startUpdate] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    startUpdate(async () => {
      try {
        const result = await deleteDesignation(designationId.toString());

        if (result.error) {
          toast.error("Failed to delete the designation.");
          return;
        }

        toast.success("Designation deleted!");
        onSuccess?.();
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete the designation.");
      }
    });
  }, [designationId, router, onSuccess]);
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
              Delete Designation
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this designation?
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
