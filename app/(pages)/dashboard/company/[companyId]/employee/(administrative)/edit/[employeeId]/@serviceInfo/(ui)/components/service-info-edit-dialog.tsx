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
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import createChangeOfCircumstances from "@/app/(server)/actions/change-of-circumstances/create-change-of-circumstances.controller";
import ServiceDetailsFormFragmentClient from "@/components/custom/Form/Fragment/Employee/ServiceDetailsFormFragmentClient";

interface Props {
  data: IEmployeeWithPersonalInfo;
  departments: IDepartment[];
  designations: IDesignation[];
  company?: ICompany;
  employmentTypes: IEmploymentType[];
}

export default function ServiceInfoEditDialog({
  data,
  designations,
  departments,
  employmentTypes,
  company,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      var emp_type_id = fd.get("emp_type_id") as string | undefined;
      var etid = 0;
      if (emp_type_id) etid = Number.parseInt(emp_type_id);

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
        emp_type_id: etid,
      };

      const newValue = {
        job_title: serviceDetails.job_title,
        employment_type:
          employmentTypes.find((et) => et.emp_type_id == etid)
            ?.employment_type ?? "",
        date_of_joining: serviceDetails.date_of_joining,
        date_of_confirmaton: serviceDetails.date_of_confirmaton,
        contract_start_date: serviceDetails.contract_start_date,
        contract_end_date: serviceDetails.contract_end_date,
        first_name: serviceDetails.first_name,
        middle_name: serviceDetails.middle_name,
        last_name: serviceDetails.last_name,
        department:
          departments.find(
            (dpt) => dpt.department_id == serviceDetails.department_id
          )?.dpt_name ?? "",
        designation:
          designations.find(
            (dsg) => dsg.designation_id == serviceDetails.designation_id
          )?.designation_name ?? "",
      };

      const oldValue: typeof newValue = {
        first_name: data?.users.first_name ?? "",
        middle_name: data?.users.middle_name ?? "",
        last_name: data?.users.last_name ?? "",
        job_title: data?.job_title ?? "",
        department:
          departments.find((dpt) => dpt.department_id == data?.department_id)
            ?.dpt_name ?? "",
        designation:
          designations.find((dsg) => dsg.designation_id == data?.designation_id)
            ?.designation_name ?? "",
        employment_type: data?.emp_type?.employment_type ?? "",
        date_of_joining: data?.date_of_joining
          ? new Date(data?.date_of_joining).toISOString().split("T")[0]
          : "",
        date_of_confirmaton: data?.date_of_confirmaton
          ? new Date(data?.date_of_confirmaton).toISOString().split("T")[0]
          : "",
        contract_start_date: data?.contract_start_date
          ? new Date(data?.contract_start_date).toISOString().split("T")[0]
          : "",
        contract_end_date: data?.contract_end_date
          ? new Date(data?.contract_end_date).toISOString().split("T")[0]
          : "",
      };

      const reqBod = Object.assign({ ...data }, serviceDetails);

      // console.log("Request body", reqBod);

      setLoading(true);
      // Request api here
      try {
        const [apiRes, coc] = await Promise.allSettled([
          fetch(`/api/employee/update-personal-info/${data.employee_id}`, {
            method: "PATCH",
            body: JSON.stringify(reqBod),
          }),
          createChangeOfCircumstances({
            employee_id: data.employee_id,
            newValue,
            oldValue,
          }),
        ]);

        console.debug("Service details changed", { coc, newValue, oldValue });

        if (coc.status === "rejected") {
          toast({
            title: "Failed to record the change of circumstances",
            variant: "destructive",
          });
        }

        if (apiRes.status === "fulfilled") {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });
          // if (onSuccess) onSuccess(data.data.department_id);

          router.refresh();
          setOpen(false);
        } else {
          toast({
            title: "Update Failed",
            variant: "destructive",
          });
        }
      } catch (err) {
        // console.error("Failed to update employee service details.", err);
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }
      setLoading(false);
    },
    [data, departments, designations, employmentTypes, router, toast]
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
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <ServiceDetailsFormFragmentClient
                data={data}
                company={company}
                designations={designations}
                departments={departments}
                employmentTypes={employmentTypes}
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
