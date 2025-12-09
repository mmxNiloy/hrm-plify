"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { ButtonGradient } from "@/styles/button.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import AnimatedTrigger from "@/components/custom/Popover/AnimatedTrigger";
import { CreateDepartmentSchema } from "@/schema/form/department.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createDepartment from "@/app/(server)/actions/company/department/create-department.controller";
import { toast } from "sonner";
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
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = CreateDepartmentSchema;
type FormType = z.infer<typeof FormSchema>;

export default function DepartmentCreationDialog({
  company_id,
}: {
  company_id: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [updating, startUpdating] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    disabled: updating,
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdating(async () => {
        try {
          const result = await createDepartment(company_id, values);

          if (result.error) {
            toast.error("");
            return;
          }

          toast.success("Department created successfully.");
          setOpen(false);
          router.refresh();
        } catch (err) {
          toast.error("Failed to create department.");
        }
      });
    },
    [company_id, router]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="gradient">
          <Plus />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex gap-1 items-center">
              <Plus />
              Create Department
            </span>
          </DialogTitle>
          <DialogDescription>
            Create a new department for your company
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="dpt_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Marketing Department" {...field} />
                  </FormControl>
                  <FormDescription>The name of the department</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="gap-1 bg-red-500 hover:bg-red-500/90 text-white hover:text-white"
                  disabled={updating}
                >
                  <Icons.cross />
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" variant={"success"} disabled={updating}>
                {updating ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  <Icons.send />
                )}
                {updating ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
