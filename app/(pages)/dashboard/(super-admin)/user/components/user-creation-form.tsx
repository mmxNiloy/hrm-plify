"use client";
import createSystemUser from "@/app/(server)/actions/user/system-user/create-system-user.controller";
import { MultiSelect } from "@/components/custom/Multiselect";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemUserSchema } from "@/schema/form/system-user.schema";
import { IPermission, IUser } from "@/schema/UserSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  permissions: IPermission[];
  onSuccess?: () => void;
}

const FormSchema = SystemUserSchema;

type FormType = z.infer<typeof FormSchema>;

export default function SystemUserCreationForm({
  permissions,
  onSuccess,
}: Props) {
  const [loading, startSubmit] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "active",
    },
    disabled: loading,
  });

  const readPerms = useMemo(() => {
    return permissions.filter((item) => item.permission_name.endsWith("read"));
  }, [permissions]);

  const updatePerms = useMemo(() => {
    return permissions.filter((item) =>
      item.permission_name.endsWith("update")
    );
  }, [permissions]);

  const createPerms = useMemo(() => {
    return permissions.filter((item) =>
      item.permission_name.endsWith("create")
    );
  }, [permissions]);

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startSubmit(async () => {
        const result = await createSystemUser(values);
        if (result.error) {
          toast.error("Failed to create user");
        } else {
          toast.success("User created!");
          if (onSuccess) onSuccess();

          router.refresh();
        }
      });
    },
    [onSuccess, router]
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ScrollArea className="h-[60vh] sm:h-[70vh]">
          <div className="px-4 gap-4 grid grid-cols-1 md:grid-cols-2">
            {/* Field group: name */}
            <Label className="text-xs text-muted-foreground col-span-full">
              Name
            </Label>

            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: Buck" {...field} />
                  </FormControl>
                  <FormDescription>This field is optional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Group: Account */}
            <Label className="text-xs text-muted-foreground col-span-full">
              Account
            </Label>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup {...field} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <RadioGroupItem value="active" id="status-active" />
                        <Label htmlFor="status-active">Active</Label>
                      </div>

                      <div className="flex gap-2">
                        <RadioGroupItem value="inactive" id="status-inactive" />
                        <Label htmlFor="status-inactive">Inactive</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: example@email.com" {...field} />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Group: Access */}
            <Label className="text-xs text-muted-foreground col-span-full">
              Access
            </Label>

            <FormField
              control={form.control}
              name="read_permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Access</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Read Access"
                      options={readPerms.map((item) => ({
                        label: item.description,
                        value: item.permission_id.toString(),
                      }))}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Select permitted read-only access for the user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="update_permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Access</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Update Access"
                      options={updatePerms.map((item) => ({
                        label: item.description,
                        value: item.permission_id.toString(),
                      }))}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Select permitted update operations for the user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="write_permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write Access</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Write Access"
                      options={createPerms.map((item) => ({
                        label: item.description,
                        value: item.permission_id.toString(),
                      }))}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Select permitted write<em>(create)</em> operations for the
                    user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>

        {/* Dialog Form Actions */}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={loading}
              variant={"destructive"}
              size="sm"
            >
              <XIcon /> Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={loading}
            className={ButtonSuccess}
            size="sm"
          >
            {loading ? (
              <Loader2 className="animate-spin ease-in-out" />
            ) : (
              <Check />
            )}{" "}
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
