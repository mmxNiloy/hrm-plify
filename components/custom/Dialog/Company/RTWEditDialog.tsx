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
import {
  ButtonBlue,
  ButtonSuccess,
  ButtonWarn,
} from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { IDutyRoster } from "@/schema/RotaSchema";
import RTWEditTabs from "../../Tabs/RTWEditTabs";
import { ICompanyUser } from "@/schema/UserSchema";
import RTWFormContextProvider from "@/providers/RTWFormContextProvider";

interface Props {
  company_id: number;
  data?: IPayroll;
  asIcon?: boolean;
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
}

export default function RTWEditDialog({
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
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
    undefined
  );
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const formRef: React.Ref<HTMLFormElement> | undefined = useRef(null);

  const handleNextTab = useCallback(() => {
    if (formRef.current) {
      const fd = new FormData(formRef.current);
      console.log("Form Data", fd);

      setCurrentTabIndex((oldVal) => oldVal + 1);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const rtw = {
        // Get rtw values from the form data or the data param
      };

      setLoading(true);

      //   try {
      //     const apiRes = await fetch(`/api/payroll`, {
      //       method: data ? "PUT" : "POST",
      //       body: JSON.stringify({
      //         payroll,
      //         employee_ids: [Number.parseInt(selectedEmployee ?? "0")],
      //       }),
      //     });

      //     if (apiRes.ok) {
      //       // Close dialog, show toast, refresh parent ssc
      //       toast({
      //         title: "Update Successful",
      //         className: ToastSuccess,
      //       });
      //       // if (onSuccess) onSuccess(data.data.department_id);

      //       router.refresh();
      //       setOpen(false);
      //     } else {
      //       // show a failure dialog
      //       const res = await apiRes.json();

      //       toast({
      //         title: "Update Failed",
      //         description: JSON.stringify(res.message),
      //         variant: "destructive",
      //       });
      //     }
      //   } catch (err) {
      //     // console.error("Failed to update employee personal information.", err);
      //     toast({
      //       title: "Update Failed",
      //       variant: "destructive",
      //     });
      //   }

      setLoading(false);
    },
    []
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        if (!e) {
          setSelectedEmployee(undefined);
          setOpen(false);
        } else setOpen(true);
      }}
    >
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.plus /> Add a RTW check
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Add a RTW check</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by an asterisk (
            <span className="text-red-500">*</span>) are required.
          </DialogDescription>
          {/* <DialogDescription>
            Bonus and deduction options are available for one employee only.
          </DialogDescription> */}
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="p-4">
              <RTWFormContextProvider>
                <RTWEditTabs
                  employees={employees}
                  currentTabIndex={currentTabIndex}
                />
              </RTWFormContextProvider>
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
              type="button"
              size={"sm"}
              disabled={loading || currentTabIndex < 1}
              onClick={() => setCurrentTabIndex((oldVal) => oldVal - 1)}
              className={ButtonWarn}
            >
              <Icons.chevronLeft />
              Back
            </Button>
            {currentTabIndex < 4 ? (
              <Button
                onClick={handleNextTab}
                type="button"
                size={"sm"}
                disabled={loading}
                className={ButtonBlue}
              >
                Next
                <Icons.chevronRight />
              </Button>
            ) : (
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
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
