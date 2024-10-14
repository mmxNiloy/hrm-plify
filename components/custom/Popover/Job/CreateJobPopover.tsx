"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ButtonBlue } from "@/styles/button.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";

export default function CreateJobPopover({
  company_id,
}: {
  company_id: number;
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
        const apiRes = await fetch(`/api/job`, {
          method: "POST",
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
        console.error("Failed to create department.", err);
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [router, toast]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <AnimatedTrigger label="Add a new Designation" />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="min-w-96 w-fit"
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

          <div className="flex flex-row gap-2 items-center justify-center">
            <div className="flex-grow flex felx-col gap-2">
              {/* <Label htmlFor="department-name-input">Department Name</Label> */}
              <Input
                className="rounded-full"
                name="designation_name"
                id="department-name-input"
                placeholder="Designation"
                required
              />
            </div>

            {/* <PopoverClose asChild>
              <Button
                className="size-8 rounded-full"
                variant={"destructive"}
                size={"icon"}
                type="button"
                disabled={loading}
                title="Close"
              >
                <Icons.cross />
              </Button>
            </PopoverClose> */}

            <Button
              className={cn(ButtonBlue, "size-8")}
              size={"icon"}
              type="submit"
              disabled={loading}
              title="Submit"
            >
              <Icons.check />
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
