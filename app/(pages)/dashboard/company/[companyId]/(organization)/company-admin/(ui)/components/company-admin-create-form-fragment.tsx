"use client";

import createCompanyAdmin from "@/app/(server)/actions/company/admin/create-company-admin.controller";
import updateUser from "@/app/(server)/actions/user/update-user.controller";
import { Button } from "@/components/ui/button";
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
import { PasswordInput } from "@/components/ui/password-input";
import {
  CreateCompanyUserSchema,
  UpdateCompanyAdminSchema,
} from "@/schema/form/company.schema";
import { CreateUserSchema } from "@/schema/form/user.schema";
import { ICompanyUser } from "@/schema/UserSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  companyId: string;
  onSuccess?: () => void;
}

const FormSchema = CreateCompanyUserSchema;
type FormType = z.infer<typeof FormSchema>;

export default function CompanyAdminCreateFormFragment({
  companyId,
  onSuccess,
}: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    disabled: updating,
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await createCompanyAdmin(companyId, values);

          if (result.error) {
            toast.error("Failed to assign company admin.");
            return;
          }

          toast.success("Company admin assigned!");
          if (onSuccess) onSuccess();
        } catch (error) {
          toast.error("Failed to assign company admin.");
        }
      });
    },
    [companyId, onSuccess]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-2 flex flex-col gap-4 h-[60vh] md:h-[70vh] overflow-y-scroll">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="eg: example@email.com" {...field} />
                </FormControl>
                <FormDescription>Enter the email of the user</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormDescription>
                  Enter the password of the user
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Jean" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the First Name of the user
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="eg: Baptiste" />
                </FormControl>
                <FormDescription>
                  Enter the Middle Name of the user
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Dupont" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the Last Name of the user
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={updating}
              variant={"destructive"}
              size="sm"
            >
              <Icons.cross /> Close
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={updating}
            size="sm"
            className="bg-green-500 hover:bg-green-500/90 text-white"
          >
            {updating ? (
              <Icons.spinner className="animate-spin ease-in-out" />
            ) : (
              <Icons.send />
            )}
            {updating ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
