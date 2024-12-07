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
import { useToast } from "@/components/ui/use-toast";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { ICompany, IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import ServiceDetailsFormFragmentClient from "../../Form/Fragment/Employee/ServiceDetailsFormFragmentClient";

export default function ServiceInformationEditDialog({
  data,
  designations,
  departments,
  company,
}: {
  data: IEmployeeWithPersonalInfo;
  departments: IDepartment[];
  designations: IDesignation[];
  company?: ICompany;
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

      const serviceDetails = {
        first_name: data.users.first_name,
        middle_name: data.users.middle_name,
        last_name: data.users.last_name,
        job_title: fd.get("job_title") as string,
        department_id: parseInt(fd.get("department_id") as string), // DepartmentSelect should provide department_id
        designation_id: parseInt(fd.get("designation_id") as string), // DesignationSelect should provide designation_id
        employment_type: fd.get("employment_type") as string,
        date_of_joining: fd.get("date_of_joining") as string, // Can be converted to Date if necessary
        date_of_confirmaton: fd.get("date_of_confirmaton") as string, // Can be converted to Date if necessary
        contract_start_date: fd.get("contract_start_date") as string, // Can be converted to Date if necessary
        contract_end_date: fd.get("contract_end_date") as string, // Can be converted to Date if necessary
      };

      const reqBod = Object.assign(data, serviceDetails);

      console.log("Request body", reqBod);

      setLoading(true);
      // Request api here
      try {
        const apiRes = await fetch(
          `/api/employee/update-personal-info/${data.employee_id}`,
          {
            method: "PATCH",
            body: JSON.stringify(reqBod),
          }
        );

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
    [data, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonWarn}>
          <Icons.edit /> Edit Service Details
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Service Details</DialogTitle>
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
              <ServiceDetailsFormFragmentClient
                data={data}
                company={company}
                designations={designations}
                departments={departments}
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
