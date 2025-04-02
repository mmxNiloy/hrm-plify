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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import {
  IEmployeeWithSalaryStructure,
  IPayroll,
  ISalaryStructure,
} from "@/schema/Payroll";
import SalaryStructureFormFragment from "../../Form/Fragment/Payroll/SalaryStructureFormFragment";
import PayrollFormFragment from "../../Form/Fragment/Payroll/PayrollFormFragment";
import { getEmployeeSalaryStructure } from "@/app/(server)/actions/getEmployeeSalaryStructure";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";

interface Props {
  company_id: number;
  data?: IPayroll;
  asIcon?: boolean;
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
  departments: IDepartment[];
  designations: IDesignation[];
}

export default function PayrollEditDialog({
  data,
  asIcon = false,
  employees = [],
  company_id,
  asEditable = false,
  departments,
  designations,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
    undefined
  );
  const [salaryStruct, setSalaryStruct] = useState<
    ISalaryStructure | undefined
  >(undefined);

  const getSalaryStructureData = useCallback(async () => {
    // console.log("Get Employee Salary Structure > BEGIN");
    if (!selectedEmployee) return;
    setLoading(true);

    const sal = await getEmployeeSalaryStructure(
      Number.parseInt(selectedEmployee)
    );
    if (sal.data) {
      setSalaryStruct(sal.data.data);
    }

    setLoading(false);
  }, [selectedEmployee]);

  useEffect(() => {
    // Get salary structure for a selected employee
    getSalaryStructureData();
  }, [getSalaryStructureData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const payroll = {
        id: data?.id ?? 0,
        // company_id: Number.parseInt(`${company_id}`),
        employee_id: Number.parseInt(
          selectedEmployee ??
            (fd.get("employee_id") as string | undefined) ??
            "0"
        ),
        pay_period: fd.get("pay_period") as string | undefined,
        gross_salary: Number.parseFloat(
          (fd.get("gross_salary") as string | undefined) ?? "0"
        ),
        net_salary: Number.parseFloat(
          (fd.get("net_salary") as string | undefined) ?? "0"
        ),
        overtime_pay: Number.parseFloat(
          (fd.get("overtime_pay") as string | undefined) ?? "0"
        ),
        tax_deduction: Number.parseFloat(
          (fd.get("tax_deduction") as string | undefined) ?? "0"
        ),
        status:
          (fd.get("status") as
            | "Pending"
            | "Processed"
            | "Failed"
            | undefined) ?? "Pending",
        bonus_amount: Number.parseFloat(
          (fd.get("bonus_amount") as string | undefined) ?? "0"
        ),
        bonus_reason: (fd.get("bonus_reason") as string | undefined) ?? "",
        deduction_amount: Number.parseFloat(
          (fd.get("deduction_amount") as string | undefined) ?? "0"
        ),
        deduction_reason:
          (fd.get("deduction_reason") as string | undefined) ?? "",
      };

      // console.log("Payroll Edit dialog > Form Data", payroll);

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/payroll`, {
          method: data ? "PUT" : "POST",
          body: JSON.stringify({
            payroll,
            employee_ids: [Number.parseInt(selectedEmployee ?? "0")],
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
    [data, router, selectedEmployee, toast]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        if (!e) {
          setSelectedEmployee(undefined);
          setSalaryStruct(undefined);
          setOpen(false);
        } else setOpen(true);
      }}
    >
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon" title="Create Payroll">
            <Icons.printer />
          </Button>
        ) : (
          <Button className={ButtonGradient}>
            <Icons.printer /> Create Payroll
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
          <DialogTitle>Generate Payroll</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
          {/* <DialogDescription>
            Bonus and deduction options are available for one employee only.
          </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <PayrollFormFragment
                onEmployeeSelect={(employee) => {
                  setSelectedEmployee(employee);
                }}
                disabled={loading}
                data={data}
                employees={employees}
                asEditable={asEditable}
                salaryStruct={salaryStruct}
                loading={loading}
                departments={departments}
                designations={designations}
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
              disabled={loading || !salaryStruct}
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
