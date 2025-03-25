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
import { ButtonGradient } from "@/styles/button.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";
import { Label } from "@/components/ui/label";

export default function DepartmentCreationPopover({
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
        const apiRes = await fetch(`/api/company/department`, {
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
    [router, toast]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <AnimatedTrigger label="Add a new Department" />
      </PopoverTrigger>

      <PopoverContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
        align="end"
      >
        <form onSubmit={handleSubmit}>
          <div className="sr-only">
            <Input
              readOnly
              name="company_id"
              id="company-id-input"
              placeholder="Company ID"
              defaultValue={company_id}
            />
          </div>
          <div className="flex flex-col *:w-full gap-4 items-center justify-center">
            <div className="flex flex-col gap-2">
              <Label>Department Name</Label>
              <Input name="dpt_name" placeholder="Department Name" required />
            </div>

            <Button className={ButtonGradient} type="submit" disabled={loading}>
              <Icons.check />
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
