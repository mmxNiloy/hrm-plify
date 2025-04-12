"use client";

import changePassword from "@/app/(server)/actions/changePassword";
import { logout } from "@/app/(server)/actions/logout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/icons";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  new_password: z.string().min(6),
  confirm_password: z.string().min(6),
  old_password: z.string().min(6),
});

export default function ChangePasswordDialog() {
  const [loading, startAPICall] = useTransition();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
      old_password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      if (data.confirm_password !== data.new_password) {
        toast({
          title: "New passwords did not match",
          variant: "destructive",
        });
        return;
      }

      startAPICall(async () => {
        const result = await changePassword(data);

        if (result.error) {
          toast({
            title: "Update failed",
            description: result.error.message,
            variant: "destructive",
          });

          return;
        }

        toast({
          title: "Password changed",
          className: ToastSuccess,
        });
        setOpen(false);
        await logout();
      });
    },
    [toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonGradient}>
          <Icons.key /> Change Password
        </Button>
      </DialogTrigger>
      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription className="sr-only">
            Change your password
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput minLength={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput minLength={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput minLength={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className={ButtonSuccess}>
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : (
                <Icons.check />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
