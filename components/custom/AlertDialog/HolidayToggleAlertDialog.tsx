"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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
import { cn } from "@/lib/utils";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { IHoliday } from "@/schema/HolidaySchema";

interface Props {
  data: IHoliday;
}

export default function HolidayToggleEditDialog({ data }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setLoading(true);

      const newData = { ...data };

      try {
        const apiRes = await fetch(`/api/holiday`, {
          method: "PATCH",
          body: JSON.stringify(
            Object.assign(newData, {
              is_active: ((data.is_active ?? 0) + 1) % 2,
            })
          ),
        });

        if (apiRes.ok) {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });
          // if (onSuccess) onSuccess(data.data.department_id);

          router.refresh();
          setOpen(false);
        } else {
          // show a failure dialog
          const res = await apiRes.json();

          toast({
            title: "Update Failed",
            description: JSON.stringify(res.message),
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Failed to update leave approver");
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [data, router, toast]
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={cn(data.is_active ? ButtonWarn : ButtonSuccess)}>
          {data.is_active ? (
            <>
              <Icons.trash /> Delete
            </>
          ) : (
            <>
              <Icons.recover /> Recover
            </>
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {data.is_active ? "Delete" : "Recover"} this Holiday?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {data.is_active ? "delete" : "recover"}{" "}
            this Holiday?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full bg-red-500 hover:bg-red-400"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> No
              </Button>
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={loading}
              className={ButtonSuccess}
              size="sm"
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Yes
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
