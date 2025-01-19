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
import React, { useCallback, useState } from "react";
import EmergencyContactFormFragment from "../../Form/Fragment/Employee/EmergencyContactFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function EmergencyContactEditDialog({
  employee_id,
  data,
  asIcon,
}: {
  employee_id: number;
  data?: IEmployeeEmergencyContact;
  asIcon?: boolean;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const emergencyContactDetails = {
        employee_id: Number.parseInt(`${employee_id}`),
        contact_name: fd.get("contact_name") as string,
        relationship: fd.get("relationship") as string,
        phone_number: fd.get("phone_number") as string,
        email: fd.get("email") as string | null,
        address: fd.get("address") as string | null,
      };

      const reqBod = data
        ? Object.assign(data, emergencyContactDetails)
        : emergencyContactDetails;

      setLoading(true);
      // Request api here
      try {
        const apiRes = await fetch(`/api/employee/emergency-contact`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(reqBod),
        });

        if (apiRes.ok) {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });
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
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }
      setLoading(false);
    },
    [data, employee_id, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon" className="rounded-full">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.edit /> Add Emergency Contact
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Emergency Contact</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <EmergencyContactFormFragment data={data} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
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
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
