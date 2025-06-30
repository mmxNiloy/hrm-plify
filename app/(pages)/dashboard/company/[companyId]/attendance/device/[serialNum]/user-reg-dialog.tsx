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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import registerFingerprintUser from "@/app/(server)/actions/fingerprint/register-fingerprint-user.controller";
import { LabelledComboBox } from "@/components/ui/combobox";
import { getFullNameOfEmployee } from "@/utils/Misc";

interface Props {
  serialNum: string;
  employees: IEmployeeWithUserMetadata[];
}

const FormSchema = z.object({
  employee_id: z.coerce.number().positive(),
  internalId: z.string(),
  serialNum: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

export default function UserRegDialog({ serialNum, employees }: Props) {
  const [open, setOpen] = useState(false);
  const [updating, startUpdate] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    disabled: updating,
    defaultValues: {
      serialNum,
    },
  });

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await registerFingerprintUser(values);

          if (result.error) {
            toast.error("Failed to register fingerprint user");
            return;
          }

          toast.success("Fingerprint user registered successfully");

          router.refresh();
          setOpen(false);
        } catch (err) {
          toast.error("Failed to register fingerprint user");
        }
      });
    },
    [router]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonGradient}>
          <Plus />
          Add User
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
              <Plus /> Add a Device User
            </span>
          </DialogTitle>
          <DialogDescription>
            Register a new fingerprint device user.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <LabelledComboBox
                      className="w-full"
                      items={employees.map((emp) => ({
                        label: getFullNameOfEmployee(emp),
                        value: emp.employee_id.toString(),
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label="Select an employee"
                    />
                  </FormControl>
                  <FormDescription>
                    Select the employee to register.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="internalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 123" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide the ID that the user has on the fingerprint device.
                    This ID is internal to the device.
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
