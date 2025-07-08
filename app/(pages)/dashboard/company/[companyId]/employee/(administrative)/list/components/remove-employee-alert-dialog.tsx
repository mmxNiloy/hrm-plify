"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React, { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import removeEmployee from "@/app/(server)/actions/company/employee/remove-employee.controller";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props extends ButtonProps {
  data: IEmployeeWithUserMetadata;
}

const FormSchema = z.object({
  status: z.enum(["TERMINATED", "RESIGNED", "RETIRED"]),
});

type FormType = z.infer<typeof FormSchema>;

const RemoveEmployeeAlertDialog = React.forwardRef<HTMLButtonElement, Props>(
  ({ data, ...props }, ref) => {
    const [loading, startDelete] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm({
      resolver: zodResolver(FormSchema),
    });

    const handleDelete = useCallback(
      (values: FormType) => {
        startDelete(async () => {
          try {
            const result = await removeEmployee({
              employeeId: data.employee_id.toString(),
              status: values.status,
            });
            if (result.error) {
              toast.error("Failed to remove employee.");
              return;
            }

            toast.success("Employee removed successfully.");
            setOpen(false);
            router.refresh();
          } catch (err) {
            toast.error("Failed to removed employee.");
          }
        });
      },
      [router, data.employee_id, data.company_id]
    );

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button {...props} ref={ref}></Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader className="text-red-500">
            <AlertDialogTitle>
              Remove{" "}
              <span className="max-w-36 overflow-hidden text-ellipsis">
                {getFullNameOfEmployee(data)}
              </span>
              ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              <strong className="text-red-500">
                remove [{data.employee_code}] {getFullNameOfEmployee(data)}
              </strong>{" "}
              from the company?
              {/* <br /> */}
              <em className="text-red-500">This action is irreversible.</em>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleDelete)}>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="TERMINATED"
                            id="radio-item-terminated"
                          />
                          <Label htmlFor="radio-item-terminated">
                            Terminated
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="RESIGNED"
                            id="radio-item-resigned"
                          />
                          <Label htmlFor="radio-item-resigned">Resigned</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="RETIRED"
                            id="radio-item-retired"
                          />
                          <Label htmlFor="radio-item-retired">Retired</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
                <AlertDialogCancel
                  type="button"
                  disabled={loading}
                  className="bg-stone-600 hover:bg-stone-500 rounded-full hover:text-white text-white"
                >
                  <Icons.cross /> Cancel
                </AlertDialogCancel>

                <Button
                  type="submit"
                  disabled={loading}
                  variant={"destructive"}
                  size={"sm"}
                  className="rounded-full"
                >
                  {loading ? (
                    <>
                      <Icons.spinner className="animate-spin ease-in-out" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Icons.trash /> Proceed
                    </>
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
RemoveEmployeeAlertDialog.displayName = "RemoveEmployeeAlertDialog";
export default RemoveEmployeeAlertDialog;
