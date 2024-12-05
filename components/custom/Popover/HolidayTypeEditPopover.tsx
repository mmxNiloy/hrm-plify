"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { IHolidayType } from "@/schema/HolidaySchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { cn } from "@/lib/utils";
import AnimatedTrigger from "./AnimatedTrigger";

export default function HolidayTypeEditPopover({
  data,
  asIcon = false,
  company_id,
}: {
  data?: IHolidayType;
  asIcon?: boolean;
  company_id: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const leaveType: IHolidayType = {
        company_id: Number.parseInt(`${company_id}`),
        id: data?.id ?? 1,
        holiday_type_name: fd.get("holiday_type_name") as string,
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/holiday/type`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(leaveType),
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
        console.error("Failed to update leave type");
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [company_id, data, router, toast]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <AnimatedTrigger label="Create a holiday Type" />
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className={RequiredAsterisk}>Holiday Type</Label>
            <Input
              className="rounded-full"
              name="holiday_type_name"
              key={`holiday-type-name-${data?.holiday_type_name}`}
              required
              disabled={loading}
              defaultValue={data?.holiday_type_name}
              placeholder="Holiday Type"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className={cn(ButtonSuccess, "w-full")}
            size="sm"
          >
            {loading ? (
              <Icons.spinner className="animate-spin ease-in-out" />
            ) : (
              <Icons.check />
            )}{" "}
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
