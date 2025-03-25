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
import { useToast } from "@/components/ui/use-toast";
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { IUser } from "@/schema/UserSchema";
import { IEmployee, IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { updateAttendance } from "@/app/(server)/actions/updateAttendance";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  company_id: number;
  employees: IEmployeeWithUserMetadata[];
  asGenerator?: boolean;
}

export default function AttendanceBulkUpdateDialog({
  company_id,
  employees,
  asGenerator = false,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const path = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const reqBod = {
        company_id,
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        from_date: new Date(
          (fd.get("from_date") as string | undefined) ?? new Date()
        ),
        to_date: new Date(
          (fd.get("to_date") as string | undefined) ?? new Date()
        ),
        value: Number.parseInt((fd.get("value") as string | undefined) ?? "0"),
      };

      setLoading(true);

      const result = await updateAttendance({
        ...reqBod,
        run_generate: asGenerator,
      });

      if (result.error) {
        toast({
          title: "Update Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Update Successful",
          className: ToastSuccess,
        });

        setOpen(false);
        if (asGenerator) {
          router.push(
            path.concat(`?employeeId=${reqBod.employee_id}&sort=DESC`)
          );
        } else {
          router.refresh();
        }
      }

      setLoading(false);
    },
    [asGenerator, company_id, path, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonGradient}>
          <Icons.update /> Update Attendance
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className={DialogTitleStyles}>
            <Icons.update /> {asGenerator ? "Generate" : "Update"} Attendance of
            an Employee
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Form body */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-full flex flex-col gap-2">
              <Label className={RequiredAsterisk}>Select an Employee</Label>
              <Select name="employee_id" required disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an Employee" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select an employee</SelectLabel>
                    {employees.map((emp) => (
                      <SelectItem
                        value={emp.employee_id.toString()}
                        key={
                          "employee-select-item-" + emp.employee_id.toString()
                        }
                      >
                        {getFullNameOfEmployee(emp)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className={RequiredAsterisk}>From Date</Label>
              <Input disabled={loading} required type="date" name="from_date" />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={RequiredAsterisk}>To Date</Label>
              <Input disabled={loading} required type="date" name="to_date" />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={RequiredAsterisk}>Status</Label>
              <RadioGroup
                required
                disabled={loading}
                defaultValue="0"
                name="value"
              >
                <div className="flex gap-1 items-center">
                  <RadioGroupItem value={"0"} />
                  <p>Absent</p>
                </div>
                <div className="flex gap-1 items-center">
                  <RadioGroupItem value={"1"} />
                  <p>Present</p>
                </div>
                {!asGenerator && (
                  <>
                    <div className="flex gap-1 items-center">
                      <RadioGroupItem value={"2"} />
                      <p>Day Off</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <RadioGroupItem value={"3"} />
                      <p>Holiday</p>
                    </div>
                  </>
                )}
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={loading}
                type="button"
                className="rounded-full gap-2"
                variant={"destructive"}
                size={"sm"}
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>

            <Button
              disabled={loading}
              type="submit"
              className={ButtonSuccess}
              size={"sm"}
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
