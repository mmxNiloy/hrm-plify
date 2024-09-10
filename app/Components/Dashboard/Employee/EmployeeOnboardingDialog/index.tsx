"use client";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
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
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EmployeeOnboardingDialog({
  company_id,
  departments,
  designations,
}: {
  company_id: number;
  departments: IDepartment[];
  designations: IDesignation[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const fd = new FormData(e.currentTarget);

    setLoading(true);

    try {
      const apiRes = await fetch(`/api/employee`, {
        method: "POST",
        body: fd,
      });

      const res = await apiRes.json();

      if (apiRes.ok) {
        // Close dialog, show toast, refresh parent ssc
        toast({
          title: "Creation Successful",
          className: ToastSuccess,
        });
        // if (onSuccess) onSuccess(data.data.department_id);

        router.refresh();
        setOpen(false);
      } else {
        // show a failure dialog
        toast({
          title: "Creation Failed",
          description: JSON.stringify(res.message),
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Failed to create employee.", err);
      toast({
        title: "Creation Failed",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonBlue}>
          <Icons.plus /> Add an Employee
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
            <Icons.employee /> Add an Employee
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Form body */}
          <div className="flex flex-col gap-4 h-[70vh]">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email-input">Email</Label>
              <Input
                required
                id="email-input"
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="first-name-input">First Name</Label>
              <Input
                required
                id="first-name-input"
                name="fname"
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="middle-name-input">Middle Name</Label>
              <Input
                required
                id="middle-name-input"
                name="middleName"
                placeholder="Middle Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="last-name-input">Last Name</Label>
              <Input
                required
                id="last-name-input"
                name="lname"
                placeholder="Last Name"
              />
            </div>

            <Input className="hidden" name="company_id" value={company_id} />

            <div className="flex flex-col gap-2">
              <Label>Department</Label>
              <Select required name="department_id">
                <SelectTrigger>
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a department</SelectLabel>

                    {departments.map((dpt) => (
                      <SelectItem
                        value={`${dpt.department_id}`}
                        key={`${dpt.department_id}`}
                      >
                        {dpt.dpt_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Designation</Label>
              <Select required name="designation_id">
                <SelectTrigger>
                  <SelectValue placeholder="Select a Designation" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a designation</SelectLabel>

                    {designations.map((dsg) => (
                      <SelectItem
                        value={`${dsg.designation_id}`}
                        key={`${dsg.designation_id}`}
                      >
                        {dsg.designation_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
