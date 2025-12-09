"use client";

import createBilling from "@/app/(server)/actions/billing/create-billing.controller";
import updateBilling from "@/app/(server)/actions/billing/update-billing.controller";
import { Button } from "@/components/ui/button";
import { LabelledComboBox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ICompany } from "@/schema/CompanySchema";
import { IBank } from "@/schema/form/bank.schema";
import {
  BillingSchema,
  BillingStatusList,
  IBilling,
} from "@/schema/form/billing.schema";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useCallback, useMemo, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props {
  data?: IBilling;
  companies: ICompany[];
  banks: IBank[];
}

const FormSchema = BillingSchema;
type FormType = z.infer<typeof FormSchema>;

export default function BillingForm({ data, companies, banks }: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: data?.address ?? "",
      bank_id: data?.bank_id,
      account_id: data?.account_id,
      company_id: data?.company_id,
      recipient: data?.recipient ?? "",
      status: data?.status ?? "UNPAID",
      items: data?.items ?? [],
    },
    disabled: updating,
  });

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const operation = data
            ? updateBilling(data.id.toString(), values)
            : createBilling(values);
          const result = await operation;

          if (result.error) {
            toast.error(
              `Failed to create/update data. Cause: ${result.message}`
            );
            return;
          }

          toast.success("Document updated!");
          router.replace(".");
        } catch (err) {
          toast.error(
            "An unexpected error has occured. Please try again later."
          );
        }
      });
    },
    [data, router]
  );

  const suggestedCompanies = useMemo(() => {
    return [...companies, data?.company]
      .filter((item) => !!item)
      .map((item) => ({
        label: item.company_name,
        value: item.company_id.toString(),
        image: item.logo,
      }));
  }, [companies, data?.company]);

  const [companySearch, setCompanySearch] = useQueryState(
    "companySearch",
    searchParamsParsers.companySearch
  );

  const selectedBank = form.watch("bank_id");

  const suggestedBanks = useMemo(() => {
    return [...banks, data?.bank]
      .filter((item) => !!item)
      .map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }));
  }, [banks, data?.bank]);

  const suggestedBankAccounts = useMemo(() => {
    const accounts = banks.map((item) => item.accounts).flat() ?? [];
    const dataAccounts = data?.bank.accounts ?? [];
    return [...accounts, ...dataAccounts]
      .filter((item) => !!item)
      .map((item) => ({
        label: item.account_number,
        value: item.id.toString(),
      }));
  }, [banks, data?.bank.accounts]);

  // Dynamic list for billing item
  const watchedItems = form.watch("items");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const totals = useMemo(() => {
    const subTotal = (watchedItems ?? []).reduce((sum, i) => {
      const qty = Number(i.quantity) || 0;
      const price = Number(i.unit_price) || 0;
      return sum + qty * price;
    }, 0);

    const taxTotal = (watchedItems ?? []).reduce((sum, i) => {
      const qty = Number(i.quantity) || 0;
      const taxPrice = Number(i.taxable_unit_price) || 0;
      return sum + qty * taxPrice;
    }, 0);

    return { subTotal, taxTotal, grandTotal: subTotal + taxTotal };
  }, [watchedItems]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <br />
                  <FormControl>
                    <LabelledComboBox
                      label="Select a company"
                      className="w-full"
                      items={suggestedCompanies}
                      onSearchChange={setCompanySearch}
                      onValueChange={(val) => {
                        field.onChange(val);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <br />
                  <FormControl>
                    <LabelledComboBox
                      label="Select a Bank"
                      className="w-full"
                      items={suggestedBanks}
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account</FormLabel>
                  <br />
                  <FormControl>
                    <LabelledComboBox
                      disabled={!selectedBank || selectedBank < 1}
                      label="Select a Bank Account"
                      className="w-full"
                      items={suggestedBankAccounts}
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    The intended recipient of the billing statement.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Billing Address</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="resize-none"
                      placeholder="eg: 123 Main Street"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The complete address where bills should be sent.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>

                      <SelectContent>
                        {BillingStatusList.map((item) => (
                          <SelectItem
                            className="capitalize"
                            key={item}
                            value={item}
                          >
                            {item.toLowerCase().split("_").join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Items */}
            <div className="col-span-full space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Payment Items</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      narration: "",
                      quantity: 1,
                      unit_price: 0,
                      taxable_unit_price: 0,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 font-medium text-sm text-muted-foreground">
                <div className="col-span-4">Narration</div>
                <div className="col-span-1 text-center">Qty</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Taxable Price</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-1"></div>
              </div>

              {/* Item Rows */}
              {fields.map((field, index) => {
                const qty = form.watch(`items.${index}.quantity`) ?? 0;
                const unitPrice = form.watch(`items.${index}.unit_price`) ?? 0;
                const amount = qty * unitPrice;

                return (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 gap-2 items-start"
                  >
                    {/* Narration */}
                    <FormField
                      control={form.control}
                      name={`items.${index}.narration`}
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormControl>
                            <Input placeholder="Item narration" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Quantity */}
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              className="text-center"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Unit Price */}
                    <FormField
                      control={form.control}
                      name={`items.${index}.unit_price`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Taxable Unit Price */}
                    <FormField
                      control={form.control}
                      name={`items.${index}.taxable_unit_price`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Tax"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Amount (Qty × Unit Price) */}
                    <div className="col-span-2 flex items-center justify-end pr-2 text-sm font-medium">
                      {amount.toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-1 flex items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* === Totals === */}
              <div className="border-t pt-4 mt-6 space-y-2">
                <div className="flex justify-end space-x-8 text-sm">
                  <div>Subtotal (excl. tax):</div>
                  <div className="font-medium">
                    {totals.subTotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-end space-x-8 text-sm">
                  <div>Tax Total:</div>
                  <div className="font-medium">
                    {totals.taxTotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-end space-x-8 text-lg font-bold text-primary">
                  <div>Grand Total:</div>
                  <div>{totals.grandTotal.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          <Button variant={"success"}>
            {updating ? <Loader2 className="animate-spin" /> : <Save />}
            {updating ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
