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
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { IEmployeeNid } from "@/schema/EmployeeSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";
import NidFormFragment from "../../Form/Fragment/Employee/NidFormFragment";

export default function NidEditDialog({
  employee_id,
  data,
  asIcon,
}: {
  employee_id: number;
  data?: IEmployeeNid;
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
      const nidDetails = {
        employee_id: Number.parseInt(`${employee_id}`),
        nid_number: fd.get("nid_number") as string,
        issue_date: new Date(fd.get("issue_date") as string),
        expiry_date: new Date(fd.get("expiry_date") as string),
        nationality: fd.get("nationality") as string,
        document: "", // TODO: Handle file upload here,
        country_of_residence: fd.get("country_of_residence") as string,
        remark: (fd.get("remark") as string | null) ?? "",
        isCurrent: (fd.get("isCurrent") as "yes" | "no") === "yes" ? 1 : 0,
      } as IEmployeeNid;

      const reqBod = data ? Object.assign(data, nidDetails) : nidDetails;

      setLoading(true);
      // Request api here
      try {
        const apiRes = await fetch(`/api/employee/nid-info`, {
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
          <Button className={ButtonWarn}>
            <Icons.edit /> Edit NID Information
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
          <DialogTitle>Edit NID Information</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by an asterisk (
            <span className="text-red-500">*</span>) are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <NidFormFragment data={data} />
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
