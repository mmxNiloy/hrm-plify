"use client";
import updateCompanyTradingHours from "@/app/(server)/actions/company/trade/hours/update-company-trading-hours.controller";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  TradingHourSchema,
  UpdateTradingHoursSchema,
} from "@/schema/form/company.schema";
import { weekDays } from "@/utils/Misc";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = UpdateTradingHoursSchema;

type FormType = z.infer<typeof FormSchema>;
type FieldType = z.infer<typeof TradingHourSchema>;

interface Props {
  data: FieldType[];
  companyId: string;
  readOnly?: boolean;
  onSuccess?: () => void;
}

export default function CompanyTradingHoursFormFragment({
  data,
  companyId,
  readOnly,
  onSuccess,
}: Props) {
  const [updating, startUpdate] = useTransition();
  const defaultTradingHours = useMemo(() => {
    const tradingHours = weekDays.map((day) => ({
      day_name: day,
      trade_status: 0,
      opening_time: "00:00",
      closing_time: "23:59",
    }));

    if (data) {
      data.forEach((data) => {
        const index = tradingHours.findIndex(
          (item) => item.day_name === data.day_name,
        );
        if (index === -1) return;
        tradingHours[index] = data;
      });
    }

    return tradingHours;
  }, [data]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trading_hours: defaultTradingHours,
    },
    disabled: readOnly,
  });

  const dayFields = useFieldArray({
    control: form.control,
    name: "trading_hours",
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await updateCompanyTradingHours(companyId, values);

          if (result.error) {
            console.log("Trading Hour Update Failed", result);
            toast.error(`Failed to update trading hours.`);
            return;
          }

          toast.success("Trading hours updated successfully");

          if (onSuccess) onSuccess();
        } catch (err) {
          toast.error("Failed to update trading hours");
        }
      });
    },
    [companyId, onSuccess],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(
            "flex flex-col gap-4 p-2",
            readOnly ? "" : "h-[60vh] sm:h-[70vh] overflow-y-scroll",
          )}
        >
          {dayFields.fields.map((row, idx) => (
            <div key={row.id} className="flex flex-col gap-2">
              <div className="flex sm:flex-row flex-col gap-4">
                {/* Day Name, Immutable */}
                <FormField
                  control={form.control}
                  name={`trading_hours.${idx}.day_name` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          // {...form.register(
                          //   `trading_hours.${idx}.day_name` as const
                          // )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Trade status: select */}
                <FormField
                  control={form.control}
                  name={`trading_hours.${idx}.trade_status` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade Status</FormLabel>
                      <Select
                        defaultValue={(field.value ?? 0).toString()}
                        onValueChange={(val) =>
                          field.onChange(Number.parseInt(val))
                        }
                        disabled={field.disabled}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-32">
                            <SelectValue placeholder="Select Trade Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"0"}>Closed</SelectItem>
                            <SelectItem value={"1"}>Open</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Opening Time */}

                <FormField
                  control={form.control}
                  name={`trading_hours.${idx}.opening_time` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Time</FormLabel>
                      <FormControl className="w-32">
                        <Input
                          type="time"
                          // {...form.register(
                          //   `trading_hours.${idx}.opening_time` as const
                          // )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Closing Time */}

                <FormField
                  control={form.control}
                  name={`trading_hours.${idx}.closing_time` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Closing Time</FormLabel>
                      <FormControl className="w-32">
                        <Input
                          type="time"
                          // {...form.register(
                          //   `trading_hours.${idx}.closing_time` as const
                          // )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
            </div>
          ))}
        </div>
        {!readOnly && (
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant={"destructive"}
                className="gap-1"
                size={"sm"}
              >
                <Icons.cross /> Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              variant="warning"
              disabled={updating}
              className="shadow-sm hover:shadow-md"
              size={"sm"}
            >
              <Icons.update
                className={cn(updating ? "animate-spin ease-in-out" : "")}
              />
              {updating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  );
}
