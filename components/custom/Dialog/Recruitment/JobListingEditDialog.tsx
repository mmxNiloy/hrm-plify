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
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { IJobListing } from "@/schema/JobSchema";
import { generateHash } from "@/utils/Security";
import JobListingFormFragment from "../../Form/Fragment/Recruitment/JobListingFormFragment";

interface Props {
  company_id: number;
  companyData: ICompanyExtraData;
  data?: IJobListing;
  asIcon?: boolean;
  employeeId: number;
}

export default function JobListingEditDialog({
  data,
  asIcon = false,
  companyData,
  company_id,
  employeeId,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const cid = Number.parseInt(`${company_id}`);
      const listingData: IJobListing = {
        id: data?.id ?? 0,
        company_id: cid,
        dept_id: Number.parseInt(fd.get("dept_id") as string),
        desc: fd.get("desc") as string,
        designation_id: Number.parseInt(fd.get("designation_id") as string),
        employee_id: data?.employee_id ?? employeeId,
        isPublished: Number.parseInt(fd.get("isPublished") as string),
        jobCode: data?.jobCode ?? (fd.get("jobCode") as string),
        lastDate: new Date(fd.get("lastDate") as string),
        status: Number.parseInt(
          (fd.get("status") as string | undefined) ?? "0"
        ),
        title: fd.get("title") as string,
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/recruitment/listing`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(listingData),
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
        // console.error("Failed to update employee personal information.", err);
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [company_id, data, employeeId, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon" title="Update">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.plus /> Create a Job Listing
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Create"} Job Listing</DialogTitle>
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
              <JobListingFormFragment
                companyData={companyData}
                companyId={company_id}
                data={data}
              />
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
