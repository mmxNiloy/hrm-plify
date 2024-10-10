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
import { cn } from "@/lib/utils";
import { IPayGroup } from "@/schema/PayGroupSchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function PayGroupEditPopover({
  company_id,
  data,
  asIcon,
}: {
  company_id: number;
  data?: IPayGroup;
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
        const pgData: IPayGroup = {
          company_id,
          pay_group_id: data?.pay_group_id ?? 1,
          pay_group_name:
            (fd.get("pay_group_name") as string | undefined) ?? "",
          is_active: Number.parseInt(
            (fd.get("is_active") as string | undefined) ?? "0"
          ),
        };

        const apiRes = await fetch(`/api/company/pay-group`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(pgData),
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
          <Button className={ButtonBlue}>
            <Icons.plus /> Add a new Pay Group
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
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
                htmlFor="pay-group-name-input"
              >
                Pay Group
              </Label>
              <Input
                className="rounded-full"
                name="pay_group_name"
                id="pay-group-name-input"
                placeholder="Pay Group"
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label>Status</Label>
              <Select
                defaultValue={data ? `${data.is_active}` : ""}
                name="is_active"
              >
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="Select Pay Group Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select pay group</SelectLabel>
                    <SelectItem value={"0"}>Inactive</SelectItem>
                    <SelectItem value={"1"}>Active</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
