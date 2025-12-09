"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { useCallback, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { deleteContactRequest } from "@/app/(server)/actions/deleteContactDemo";
import { toast } from "sonner";

export default function DemoContactDeleteAlertDialog({ id }: { id: number }) {
  const [loading, startDelete] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = useCallback(() => {
    startDelete(async () => {
      const result = await deleteContactRequest(id);
      if (result.error) {
        toast.error("Failed to delete this item.");
      } else {
        toast.success("Request deleted.");
        setOpen(false);
        router.refresh();
      }
    });
  }, [id, router]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-500/90 w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
          size="sm"
        >
          <Icons.trash className="mr-2 size-4" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Document?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this document?
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
