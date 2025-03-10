"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { useCallback, useState } from "react";
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

export default function ContactDemoDeleteAlertDialog({
  id,
  asIcon,
}: {
  asIcon?: boolean;
  id: number;
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

      const result = await deleteContactRequest(id);
      setLoading(false);
      if (result.data) {
        toast({
          title: "Deletion Successful",
          className: ToastSuccess,
        });
        setOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Deletion Failed",
          variant: "destructive",
        });
      }
    },
    [id, router, toast]
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
          <AlertDialogTitle>Delete Document?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this document?
            <br />
            <em>This action is irreversible.</em>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
