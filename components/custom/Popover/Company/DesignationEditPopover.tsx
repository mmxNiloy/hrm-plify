"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IDesignation } from "@/schema/DesignationSchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";
import SiteConfig from "@/utils/SiteConfig";
import { IDepartment } from "@/schema/CompanySchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DesignationEditPopover({
  company_id,
  data,
  departments,
  asIcon,
}: {
  company_id: number;
  data?: IDesignation;
  departments: IDepartment[];
  asIcon?: boolean;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/company/designation`, {
          method: data ? "PUT" : "POST",
          body: fd,
        });

        const res = await apiRes.json();

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
          toast({
            title: "Update Failed",
            description: JSON.stringify(res.message),
            variant: "destructive",
          });
        }
      } catch (err) {
        // console.error("Failed to create department.", err);
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <AnimatedTrigger label={"Add a new Designation"} />
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="hidden">
            <Input
              readOnly
              name="company_id"
              id="company-id-input"
              placeholder="Company ID"
              defaultValue={company_id}
            />
          </div>

          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-full flex-grow flex flex-col gap-2">
              <Label
                className={RequiredAsterisk}
                htmlFor="department-name-input"
              >
                Department
              </Label>
              <Select
                name="department_id"
                defaultValue={
                  data?.dept_id ? data.dept_id.toString() : undefined
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a department</SelectLabel>
                    {departments.map((item) => (
                      <SelectItem
                        value={`${item.department_id}`}
                        key={`department-id-${item.department_id}`}
                      >
                        {item.dpt_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full flex-grow flex flex-col gap-2">
              <Label
                className={RequiredAsterisk}
                htmlFor="designation-name-input"
              >
                Designation
              </Label>
              <Input
                className="rounded-full"
                name="designation_name"
                id="designation-name-input"
                placeholder="Designation"
                required
              />
            </div>

            <Button
              className={cn(ButtonBlue, "w-full")}
              size={"icon"}
              type="submit"
              disabled={loading}
              title="Submit"
            >
              <Icons.check /> Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
