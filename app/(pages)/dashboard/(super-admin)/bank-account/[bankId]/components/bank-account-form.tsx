"use client";

import {
  createBankAccount,
  updateBankAccount,
} from "@/app/(server)/actions/bank/bank-account.actions";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBankAccount } from "@/schema/form/bank.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = {
  data?: IBankAccount;
  bankId: number;
  asDialog?: boolean;
  onSuccess?: () => void;
};

const BankCurrencies: [string, ...string[]] = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "CNY",
  "AUD",
  "CAD",
  "CHF",
  "HKD",
  "SGD",
];

const BankCurrencyList = [
  {
    shortcode: "USD",
    symbol: "$",
    name: "US Dollar",
  },
  {
    shortcode: "EUR",
    symbol: "€",
    name: "Euro",
  },
  {
    shortcode: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
  },
  {
    shortcode: "GBP",
    symbol: "£",
    name: "British Pound Sterling",
  },
  {
    shortcode: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
  },
  {
    shortcode: "AUD",
    symbol: "$",
    name: "Australian Dollar",
  },
  {
    shortcode: "CAD",
    symbol: "$",
    name: "Canadian Dollar",
  },
  {
    shortcode: "CHF",
    symbol: "Fr",
    name: "Swiss Franc",
  },
  {
    shortcode: "HKD",
    symbol: "$",
    name: "Hong Kong Dollar",
  },
  {
    shortcode: "SGD",
    symbol: "$",
    name: "Singapore Dollar",
  },
];

const FormSchema = z.object({
  bank_id: z.coerce.number(),
  account_number: z.string(),
  account_type: z.string(),
  tag: z.string(),
  is_active: z.boolean().optional().default(true),
  currency: z.enum(BankCurrencies).optional().default("GBP"),
});

type FormType = z.infer<typeof FormSchema>;

export default function BankAccountForm({
  data,
  bankId,
  asDialog,
  onSuccess,
}: Props) {
  const [loading, startSubmit] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bank_id: bankId,
      account_number: data?.account_number ?? undefined,
      account_type: data?.account_type ?? undefined,
      currency: data?.currency ?? "GBP",
      is_active: data?.is_active ?? true,
      tag: data?.tag ?? undefined,
    },
    disabled: loading,
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startSubmit(async () => {
        const result = await (data
          ? updateBankAccount(data.id, values)
          : createBankAccount(values));

        if (result.error) {
          toast.error(
            "Failed to update bank account! Reason: " + result.message
          );
          return;
        }

        toast.success("Update Successful!");
        router.refresh();
        onSuccess?.();
      });
    },
    [data, onSuccess, router]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="eg: 123-456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <Input placeholder="eg: Savings" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={field.disabled}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a currency</SelectLabel>
                      {BankCurrencyList.map((curr) => (
                        <SelectItem value={curr.shortcode} key={curr.shortcode}>
                          {curr.name} ({curr.symbol})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag(s)</FormLabel>
              <FormControl>
                <Input placeholder="eg: Personal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {asDialog ? (
          <DialogFooter>
            <Button variant={"success"} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Send />}
              <span>{loading ? "Loading..." : "Submit"}</span>
            </Button>
            <DialogClose asChild>
              <Button variant={"destructive"} disabled={loading}>
                <XIcon />
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <Button variant={"success"} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            <span>{loading ? "Loading..." : "Submit"}</span>
          </Button>
        )}
      </form>
    </Form>
  );
}
