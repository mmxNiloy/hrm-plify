"use client";
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
import React, { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button, ButtonProps } from "@/components/ui/button";
import { Check, Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import createEmploymentType from "@/app/(server)/actions/employment-type/create-employment-type.controller";

const FormSchema = z.object({
  employment_type: z.string().min(3),
});

type FormType = z.infer<typeof FormSchema>;

const EmploymentTypeCreateDialog = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, ...props }, ref) => {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { employment_type: "" },
  });

  const [open, setOpen] = useState<boolean>(false);
  const [loading, startSubmit] = useTransition();
  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startSubmit(async () => {
        const result = await createEmploymentType({
          ...values,
        });
        if (result.error) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
          setOpen(false);
          router.refresh();
        }
      });
    },
    [router]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} ref={ref} {...props}></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Employment Type</DialogTitle>
          <DialogDescription className="sr-only">
            Enter the value of the employment type.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="employment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: Full-time" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write the employment type here. Eg: Full-time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={loading}
                  type="button"
                  variant={"destructive"}
                  className="gap-1"
                >
                  <XIcon />
                  Close
                </Button>
              </DialogClose>

              <Button
                disabled={loading}
                className="bg-green-500 hover:bg-green-400 text-white gap-1"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Check />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

EmploymentTypeCreateDialog.displayName = "EmploymentTypeCreateDialog";

export default EmploymentTypeCreateDialog;
