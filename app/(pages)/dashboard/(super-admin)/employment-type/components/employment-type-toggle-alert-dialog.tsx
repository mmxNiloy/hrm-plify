"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonSuccess } from "@/styles/button.tailwind";
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
import { cn } from "@/lib/utils";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import deleteEmploymentType from "@/app/(server)/actions/employment-type/delete-employment-type.controller";
import { toast } from "sonner";
import updateEmploymentType from "@/app/(server)/actions/employment-type/update-employment-type.controller";

interface Props extends ButtonProps {
  data: IEmploymentType;
}

const EmploymentTypeToggleAlertDialog = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ className, data, ...props }, ref) => {
  const [loading, startToggle] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const deleteAction = useCallback(async () => {
    const result = await deleteEmploymentType({
      id: data.emp_type_id,
    });
    if (result.error) {
      toast.error("Failed to delete item. Please try again later.");
    } else {
      toast.success("Employment type deleted!");
      setOpen(false);
      router.refresh();
    }
  }, [data.emp_type_id, router]);

  const recoverAction = useCallback(async () => {
    const result = await updateEmploymentType({
      id: data.emp_type_id,
      employment_type: data.employment_type,
      isActive: true,
    });
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      setOpen(false);
      router.refresh();
    }
  }, [data.emp_type_id, data.employment_type, router]);

  const handleToggle = useCallback(() => {
    startToggle(async () => {
      if (data.isActive) {
        await deleteAction();
      } else {
        await recoverAction();
      }
    });
  }, [data.isActive, deleteAction, recoverAction]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={className} ref={ref} {...props}></Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {data.isActive ? "Delete" : "Recover"} this Employment Type?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {data.isActive ? "delete" : "recover"} this
            Employment Type?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              disabled={loading}
              className="rounded-full bg-red-500 hover:bg-red-400 gap-1"
              variant={"destructive"}
              size="sm"
            >
              <Icons.cross />
              No
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={loading}
            className={cn(ButtonSuccess, "gap-1")}
            onClick={handleToggle}
            size="sm"
          >
            {loading ? (
              <Icons.spinner className="animate-spin ease-in-out" />
            ) : (
              <Icons.check />
            )}
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

EmploymentTypeToggleAlertDialog.displayName = "EmploymentTypeToggleAlertDialog";

export default EmploymentTypeToggleAlertDialog;
