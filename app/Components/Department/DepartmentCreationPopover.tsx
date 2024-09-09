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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IDepartment } from "@/schema/CompanySchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function DepartmentCreationPopover({
  company_id,
  onSuccess,
}: {
  company_id: number;
  onSuccess?: (arg0: number) => void;
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

          const data = res as {
            message: string;
            data: IDepartment;
          };
          if (onSuccess) onSuccess(data.data.department_id);

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
    [onSuccess, router, toast]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className={ButtonBlue}>
          <Icons.plus /> Add a New Department
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="min-w-96 w-fit"
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="hidden">
            <Label htmlFor="company-id-input">Company ID</Label>
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
                name="dpt_name"
                id="department-name-input"
                placeholder="Department Name"
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
