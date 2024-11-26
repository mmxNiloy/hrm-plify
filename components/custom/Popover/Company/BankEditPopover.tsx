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
import SiteConfig from "@/utils/SiteConfig";

export default function BankEditPopover({
  company_id,
  data,
  asIcon,
}: {
  company_id: number;
  data?: IBank;
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
        const apData: IBank = {
          company_id,
          bank_id: data?.bank_id ?? 1,
          bank_name: (fd.get("bank_name") as string | undefined) ?? "",
          bank_shortcode:
            (fd.get("bank_shortcode") as string | undefined) ?? "",
        };

        const apiRes = await fetch(`/api/company/bank`, {
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
          <AnimatedTrigger label="Add a Bank" />
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
              <Label className={RequiredAsterisk}>Bank Name</Label>
              <Input
                required
                name="bank_name"
                defaultValue={data?.bank_name}
                placeholder="Bank Name"
                key={`bank-name-${data?.bank_name}`}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className={RequiredAsterisk}>Short Code</Label>
              <Input
                defaultValue={data?.bank_shortcode}
                name="bank_shortcode"
                placeholder="Short Code"
                required
                key={`bank-shortcode-${data?.bank_shortcode}`}
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
