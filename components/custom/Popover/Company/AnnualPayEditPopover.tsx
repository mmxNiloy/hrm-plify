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
import { IAnnualPay, IPayGroup } from "@/schema/PayGroupSchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";

export default function AnnualPayEditPopover({
  company_id,
  data,
  asIcon,
  payGroups = [],
}: {
  company_id: number;
  data?: IAnnualPay;
  payGroups?: IPayGroup[];
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
        const apData: IAnnualPay = {
          company_id,
          annual_pay_id: data?.annual_pay_id ?? 1,
          pay_group_id: Number.parseInt(
            (fd.get("pay_group_id") as string | undefined) ?? "0"
          ),
          annual_pay_amount: Number.parseInt(
            (fd.get("annual_pay_amount") as string | undefined) ?? "0"
          ),
        };

        const apiRes = await fetch(`/api/company/annual-pay`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(apData),
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
          <AnimatedTrigger label={"Add a new Annual Pay"} />
        )}
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
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-full flex-grow flex flex-col gap-2">
              <Label
                className={RequiredAsterisk}
                htmlFor="pay-group-name-input"
              >
                Pay Group
              </Label>
              <Select
                name="pay_group_id"
                defaultValue={data ? `${data.pay_group_id}` : ""}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Pay Group" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a Pay Group</SelectLabel>
                    {payGroups.map((pg) => (
                      <SelectItem
                        key={`pg-select-item-${pg.pay_group_id}`}
                        value={`${pg.pay_group_id}`}
                      >
                        {pg.pay_group_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className={RequiredAsterisk}>Annual Pay</Label>
              <Input
                type="number"
                min={0}
                defaultValue={data?.annual_pay_amount}
                name="annual_pay_amount"
                placeholder="Annual Pay Amount"
                required
                key={`annual-pay-amount-${data?.annual_pay_amount}`}
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
