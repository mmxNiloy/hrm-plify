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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { IPayroll, ISalaryStructure } from "@/schema/Payroll";
import SalaryStructureFormFragment from "../../Form/Fragment/Payroll/SalaryStructureFormFragment";
import PayrollFormFragment from "../../Form/Fragment/Payroll/PayrollFormFragment";

interface Props {
  company_id: number;
  data?: IPayroll;
  asIcon?: boolean;
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
}

export default function PayrollEditDialog({
  data,
  asIcon = false,
  employees = [],
  company_id,
  asEditable = false,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const salStruct: IPayroll = {
        id: data?.id ?? 0,
        // company_id: Number.parseInt(`${company_id}`),
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        pay_period: new Date(
          (fd.get("pay_period") as string | undefined) ?? new Date()
        ),
        gross_salary: Number.parseInt(
          (fd.get("gross_salary") as string | undefined) ?? "0"
        ),
        net_salary: Number.parseInt(
          (fd.get("net_salary") as string | undefined) ?? "0"
        ),
        overtime_pay: Number.parseInt(
          (fd.get("overtime_pay") as string | undefined) ?? "0"
        ),
        tax_deduction: Number.parseInt(
          (fd.get("tax_deduction") as string | undefined) ?? "0"
        ),
        status:
          (fd.get("status") as
            | "Pending"
            | "Processed"
            | "Failed"
            | undefined) ?? "Pending",
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/payroll/salary-struct`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify({
            ...salStruct,
            selected_employees: selectedEmployees.map((emp) =>
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
          <Button className={ButtonBlue}>
            <Icons.plus /> Create Payroll
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Create"} Payroll</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by an asterisk (
            <span className="text-red-500">*</span>) are required.
          </DialogDescription>
          <DialogDescription>
            Bonus and deduction options are available for one employee only.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <PayrollFormFragment
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
