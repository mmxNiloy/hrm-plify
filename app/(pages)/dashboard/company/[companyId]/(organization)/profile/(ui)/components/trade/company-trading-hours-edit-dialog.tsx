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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import CompanyTradingHoursFormFragment from "./company-trading-hours-form-fragment";
import { z } from "zod";
import { TradingHourSchema } from "@/schema/form/company.schema";

type TradeHour = z.infer<typeof TradingHourSchema>;

interface Props {
  data: TradeHour[];
  companyId: string;
}

export default function CompanyTradingHoursEditDialog({
  data,
  companyId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex gap-1 items-center">
              <Edit />
              Edit Trading Hours
            </span>
          </DialogTitle>
          <DialogDescription>
            Fill out the form to update company trading hours.
          </DialogDescription>
        </DialogHeader>

        <CompanyTradingHoursFormFragment
          companyId={companyId}
          data={data}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
