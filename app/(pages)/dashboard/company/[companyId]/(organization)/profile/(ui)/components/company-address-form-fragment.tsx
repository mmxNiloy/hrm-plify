"use client";
import updateCompanyAddress from "@/app/(server)/actions/company/address/update-company-address.controller";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICompanyAddress } from "@/schema/CompanySchema";
import { CompanyAddressSchema } from "@/schema/form/company.schema";
import { countryNames } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = CompanyAddressSchema;
type FormType = z.infer<typeof FormSchema>;

interface Props {
  data?: ICompanyAddress;
  readOnly?: boolean;
  onSuccess?: () => void;
  companyId: string;
}

export default function CompanyAddressFormFragment({
  data,
  readOnly,
  onSuccess,
  companyId,
}: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: data,
    disabled: readOnly || updating,
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await updateCompanyAddress(companyId, values);
          if (result.error) {
            toast.error(
              "Failed to update company address. Cause: " + result.message
            );
            return;
          }

          toast.success("Company address updated successfully");
          if (onSuccess) onSuccess();
        } catch (err) {
          toast.error("Failed to update company address.");
        }
      });
    },
    [companyId, onSuccess]
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={cn(
              "p-2 grid grid-cols-2 gap-4",
              !readOnly && "h-[60vh] sm:h-[70vh] overflow-y-scroll"
            )}
          >
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="col-span-full hidden md:block"></span>

            <FormField
              control={form.control}
              name="address_line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line #1</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="resize-none"
                      placeholder="eg: 123-Wisteria Lane"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line #2</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="resize-none"
                      placeholder="eg: 456-Sesame Street"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line_3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line #3</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="resize-none"
                      placeholder="eg: 789-Grove Street"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="col-span-full hidden md:block"></span>

            <FormField
              control={form.control}
              name="city_county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/County</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Hope County, Montana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <ComboBox
                      className="w-full"
                      items={countryNames}
                      placeholder="eg: USA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!readOnly && (
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="rounded-full gap-1"
                  size={"sm"}
                >
                  <Icons.cross /> Cancel
                </Button>
              </DialogClose>

              <Button
                disabled={updating}
                variant={"warning"}
                type="submit"
                className={"shadow-sm md:shadow-md"}
                size={"sm"}
              >
                <Icons.update
                  className={cn(updating && "animate-spin ease-in-out")}
                />
                <span>{updating ? "Updating..." : "Update"}</span>
              </Button>
            </DialogFooter>
          )}
        </form>
      </Form>
    </>
  );
}
