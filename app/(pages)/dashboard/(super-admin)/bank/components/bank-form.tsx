"use client";

import createBank from "@/app/(server)/actions/bank/create-bank.controller";
import updateBank from "@/app/(server)/actions/bank/update-bank.controller";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICompany } from "@/schema/CompanySchema";
import { BankSchema, IBank } from "@/schema/form/bank.schema";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props {
  data?: IBank;
  companies: ICompany[];
}

export default function BankForm({ data, companies }: Props) {
  const router = useRouter();
  const [updating, startUpdate] = useTransition();

  console.log("Data", data);

  const form = useForm({
    defaultValues: {
      company_id: data?.company_id,
      name: data?.name ?? "",
      sortcode: data?.sortcode ?? "",
      priority: data?.priority ?? "MEDIUM",
    },
    resolver: zodResolver(BankSchema),
    disabled: updating,
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof BankSchema>) => {
      console.log("Submitted values", values);
      startUpdate(async () => {
        try {
          const operation = !data
            ? createBank(values)
            : updateBank(data.id.toString(), values);
          const result = await operation;
          if (result.error) {
            toast.error(
              `Failed to ${data ? "update" : "create"} the bank. Reason: ${
                result.message
              }`
            );
            return;
          }

          toast.success(`Bank ${data ? "updated" : "created"}!`);
          router.replace("/dashboard/bank");
        } catch (err) {
          toast.error(
            "An unexpected error has occured! Please try again later."
          );
        }
      });
    },
    [data, router]
  );

  const suggestedCompanies = useMemo(() => {
    return Array.from(new Set([...companies, data?.company]))
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
        <div className="grid grid-cols-1 gap-4">
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
                    value={field.value?.toString()}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormDescription>
                  Optional. If not specified, creates a record for the system
                  users; ie: Super Admin and Admin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg: ABC Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Code</FormLabel>
                <FormControl>
                  <Input placeholder="eg: 12-34-56" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Set priority level" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority Level</SelectLabel>
                        <SelectItem value="VERY_HIGH">Very High</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="VERY_LOW">Very Low</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"success"}
            size={"sm"}
            className="[&_svg]:size-4 gap-0.5 max-w-32"
          >
            {updating ? <Loader2 className="animate-spin" /> : <Send />}
            <span>{updating ? "Submitting..." : "Submit"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
