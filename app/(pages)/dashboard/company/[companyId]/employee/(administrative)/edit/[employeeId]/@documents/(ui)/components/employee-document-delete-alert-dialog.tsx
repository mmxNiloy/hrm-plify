"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { HTMLAttributes, useCallback, useState } from "react";
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
import { LoaderCircle, Trash2, XIcon } from "lucide-react";
import deleteEmployeeDocument from "@/app/(server)/actions/company/document/delete-employee-document.controller";

interface Props extends ButtonProps {
  document_id: number;
}

const EmployeeDocumentDeleteAlertDialog = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ document_id, className, variant = "default", size, ...props }, ref) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);

      const apiRes = await deleteEmployeeDocument(document_id.toString());
      setLoading(false);
      if (!apiRes.error) {
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
    [document_id, router, toast],
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          className={className}
          ref={ref}
          size={size}
          {...props}
        ></Button>
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
              <XIcon /> Cancel
            </AlertDialogCancel>

            <Button
              disabled={loading}
              variant={"destructive"}
              size={"sm"}
              className="rounded-full"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin ease-in-out" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 /> Proceed
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
});
EmployeeDocumentDeleteAlertDialog.displayName =
  "EmployeeDocumentDeleteAlertDialog";

export default EmployeeDocumentDeleteAlertDialog;
