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
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { IUserConfig } from "@/schema/UserSchema";
import UserConfigFormFragment from "../../Form/Fragment/UserAccess/UserConfigFormFragment";
import { ISalaryStructure } from "@/schema/Payroll";
import SalaryStructureFormFragment from "../../Form/Fragment/Payroll/SalaryStructureFormFragment";

interface Props {
  company_id: number;
  data?: ISalaryStructure;
  asIcon?: boolean;
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
  currentEmployee?: number;
}

export default function SalaryStructureEditDialog({
  data,
  asIcon = false,
  employees = [],
  company_id,
  asEditable = false,
  currentEmployee,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    data
      ? [`${data.employee_id}`]
      : currentEmployee
      ? [`${currentEmployee}`]
      : []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const salStruct: ISalaryStructure = {
        id: data?.id ?? 0,
        // company_id: Number.parseInt(`${company_id}`),
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        basic_salary: Number.parseInt(
          (fd.get("basic_salary") as string | undefined) ?? "0"
        ),
        house_allowance: Number.parseInt(
          (fd.get("house_allowance") as string | undefined) ?? "0"
        ),
        transport_allowance: Number.parseInt(
          (fd.get("transport_allowance") as string | undefined) ?? "0"
        ),
        medical_allowance: Number.parseInt(
          (fd.get("medical_allowance") as string | undefined) ?? "0"
        ),
        tax_percentage: Number.parseInt(
          (fd.get("tax_percentage") as string | undefined) ?? "0"
        ),
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/payroll/salary-struct`, {
          method: data ? "PUT" : "POST",
          body: data
            ? JSON.stringify(salStruct)
            : JSON.stringify({
                salary_structure: salStruct,
                employee_ids: selectedEmployees.map((emp) =>
                  Number.parseInt(emp)
                ),
              }),
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
    [data, router, selectedEmployees, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonGradient}>
            <Icons.plus /> Add Salary Structure
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Add"} Salary Structure</DialogTitle>
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
              <SalaryStructureFormFragment
                currentEmployee={currentEmployee}
                onEmployeesSelectChange={(employees) => {
                  setSelectedEmployees(employees);
                }}
                disabled={loading}
                data={data}
                employees={employees}
                asEditable={asEditable}
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
