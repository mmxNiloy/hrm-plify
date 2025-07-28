"use client";

import createBilling from "@/app/(server)/actions/billing/create-billing.controller";
import updateBilling from "@/app/(server)/actions/billing/update-billing.controller";
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
import { Textarea } from "@/components/ui/textarea";
import { ICompany } from "@/schema/CompanySchema";
import { BillingSchema, IBilling } from "@/schema/form/billing.schema";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props {
  data?: IBilling;
  companies: ICompany[];
}

const FormSchema = BillingSchema;
type FormType = z.infer<typeof FormSchema>;

export default function BillingForm({ data, companies }: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: data?.address ?? "",
      bank_id: data?.bank_id,
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
                      className="w-full max-w-72"
                      items={suggestedCompanies}
                      onSearchChange={setCompanySearch}
                      onValueChange={(val) => field.onChange(val)}
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
                      label="Select a company"
                      className="w-full max-w-72"
                      items={suggestedCompanies}
                      onSearchChange={setCompanySearch}
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
          </div>
        </div>
      </form>
    </Form>
  );
}
