"use client";
import { toast } from "sonner";
import createFingerprintDevice from "@/app/(server)/actions/fingerprint/create-fingerprint-device.controller";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonGradient } from "@/styles/button.tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Icons from "@/components/ui/icons";

interface Props {
  companyId: string;
}

const FormSchema = z.object({
  serialNum: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

export default function FingerprintDeviceCreationDialog({ companyId }: Props) {
  const [open, setOpen] = useState(false);
  const [updating, startUpdate] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    disabled: updating,
  });

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await createFingerprintDevice({
            companyId,
            ...values,
          });

          if (result.error) {
            toast.error("Failed to register fingerprint device");
            return;
          }

          toast.success("Fingerprint device registered successfully");

          router.refresh();
          setOpen(false);
        } catch (err) {
          toast.error("Failed to register fingerprint device");
        }
      });
    },
    [companyId, router]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonGradient}>
          <Plus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-1">
              <Plus /> Add a Device
            </span>
          </DialogTitle>
          <DialogDescription>
            Register a new fingerprint device to your company.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="serialNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 123ABC456" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the serial number of the device. Usually found on the
                    back of the device or on the device menu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="bg-red-500 hover:bg-red-500/90 text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-500/90 text-white gap-1"
                disabled={updating}
              >
                {updating ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  <Icons.send />
                )}
                {updating ? "Registering..." : "Register"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
