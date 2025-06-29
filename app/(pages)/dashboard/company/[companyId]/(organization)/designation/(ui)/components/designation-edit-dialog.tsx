"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { IDesignation } from "@/schema/DesignationSchema";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { UpdateDesignationSchema } from "@/schema/form/designation.schema";
import { z } from "zod";
import { toast } from "sonner";
import updateDesignation from "@/app/(server)/actions/company/designation/update-designation.controller";
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
import { Edit } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LabelledComboBox } from "@/components/ui/combobox";
import DepartmentListContext from "../providers/department-list-context";

interface Props {
  data: IDesignation;
}

const FormSchema = UpdateDesignationSchema;
type FormType = z.infer<typeof FormSchema>;

export default function DesignationEditDialog({ data }: Props) {
  const router = useRouter();

  const context = useContext(DepartmentListContext);

  const departments = useMemo(
    () => context?.departments ?? [],
    [context?.departments]
  );

  const [open, setOpen] = useState<boolean>(false);
  const [updating, startUpdate] = useTransition();

  const form = useForm<FormType>({
    defaultValues: {
      department_id: data.dept_id,
      designation_name: data.designation_name,
    },
    disabled: updating,
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await updateDesignation(
            data.designation_id.toString(),
            values
          );
          if (result.error) {
            toast.error("Failed to update the designation!");
            return;
          }

          toast.success("The designation has been updated!");
          setOpen(false);
          router.refresh();
        } catch (err) {
          toast.error("Failed to update the designation!");
        }
      });
    },
    [data.designation_id, router]
  );

  if (!context) {
    throw new Error("Department list context not found!");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={"ghost"}
          className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
        >
          <Edit />
          Edit
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
              <Edit /> Edit Designation
            </span>
          </DialogTitle>
          <DialogDescription>
            Edit the details of the designation
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <LabelledComboBox
                      className="w-full"
                      items={departments.map((dpt) => ({
                        label: dpt.dpt_name,
                        value: dpt.department_id.toString(),
                      }))}
                      value={field.value?.toString() ?? ""}
                      onValueChange={(val) => field.onChange(val)}
                    />
                  </FormControl>
                  <FormDescription>
                    Select a department for the designation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Security Consultant" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the name of the designation?
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
