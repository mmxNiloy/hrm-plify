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
import { IBank } from "@/schema/BankSchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";
import { ITax } from "@/schema/TaxSchema";
import { IPaymentType } from "@/schema/PaymentTypeSchema";
import SiteConfig from "@/utils/SiteConfig";

export default function PaymentTypeEditPopover({
  company_id,
  data,
  asIcon,
}: {
  company_id: number;
  data?: IPaymentType;
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
        const apData: IPaymentType = {
          company_id,
          payment_type_id: data?.payment_type_id ?? 1,
          payment_type_name:
            (fd.get("payment_type_name") as string | undefined) ?? "",
          rate: (fd.get("rate") as string | undefined) ?? "",
          min_hours: Number.parseInt(
            (fd.get("min_hours") as string | undefined) ?? "0"
          ),
        };

        const apiRes = await fetch(`/api/company/payment-type`, {
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
          <AnimatedTrigger label="Add a Payment Type" />
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
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-full flex-grow flex flex-col gap-2">
              <Label className={RequiredAsterisk}>Payment Type</Label>
              <Input
                required
                name="payment_type_name"
                defaultValue={data?.payment_type_name}
                placeholder="Payment Type"
                key={`payment-type-name-${data?.payment_type_name}`}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className={RequiredAsterisk}>Minimum Work Hours</Label>
              <Input
                type="number"
                defaultValue={data?.min_hours}
                name="bank_shortcode"
                placeholder="Minimum Work Hours"
                required
                key={`minimum-work-hours-${data?.min_hours}`}
              />
            </div>

            <div className="w-full flex-grow flex flex-col gap-2">
              <Label className={RequiredAsterisk}>Rate</Label>
              <Input
                required
                name="rate"
                defaultValue={data?.rate}
                placeholder="Rate"
                key={`rate-${data?.rate}`}
              />
            </div>

            <Button
              className={cn(ButtonBlue, "w-full")}
              size={"icon"}
              type="submit"
              disabled={
                loading || SiteConfig.featureFlags.disableExperimentalUI
              }
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
