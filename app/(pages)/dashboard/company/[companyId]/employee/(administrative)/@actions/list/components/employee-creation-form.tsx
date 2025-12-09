"use client";

import createEmployee from "@/app/(server)/actions/company/employee/create-employee.controller";
import { Button } from "@/components/ui/button";
import { LabelledComboBox } from "@/components/ui/combobox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { CreateEmployeeSchema } from "@/schema/form/user.schema";
import SiteConfig from "@/utils/SiteConfig";
import uploadFile from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, Send, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props {
  companyId: string;
  departments: IDepartment[];
  designations: IDesignation[];
  employmentTypes: IEmploymentType[];
  onSuccess?: () => void;
}

const FormSchema = CreateEmployeeSchema.extend({
  imageFile: z
    .instanceof(File)
    .refine(
      (file) => file?.size < SiteConfig.maxFileSize,
      `Maximum file size is ${Number.parseInt(
        (SiteConfig.maxFileSize / 1e6).toString()
      )} MB`
    )
    .refine((file) => {
      return file?.type.startsWith("image/");
    }, "Unsupport file type. Only image files are allowed.")
    .optional(),
});
type FormType = z.infer<typeof FormSchema>;

export default function EmployeeCreationForm({
  departments,
  designations,
  employmentTypes,
  companyId,
  onSuccess,
}: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm({
    disabled: updating,
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = useCallback(
    (data: FormType) => {
      startUpdate(async () => {
        try {
          let image = undefined;
          if (data.imageFile) {
            const uploadResponse = await uploadFile(data.imageFile);
            if (uploadResponse.ok) {
              image = uploadResponse.data.fileUrl;
            }
          }

          const result = await createEmployee({
            companyId,
            data: {
              ...data,
              image,
            },
          });

          if (result.error) {
            toast.error("Failed to create employee.");
            return;
          }

          toast.success("Employee created successfully.");
          if (onSuccess) onSuccess();
        } catch (err) {
          toast.error("Failed to create employee.");
        }
      });
    },
    [companyId, onSuccess]
  );

  const dept_id = form.watch("department_id");

  const filteredDesignations = useMemo(
    () =>
      designations.filter((item) => item.department.department_id == dept_id),
    [dept_id, designations]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="h-[60vh] sm:h-[70vh] overflow-y-scroll px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <span></span> */}
            {/* Profile pic selector */}
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem className="row-span-5">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={field.disabled}
                      onChange={(e) => {
                        const file = e.target.files?.item(0);

                        field.onChange(file);
                      }}
                    />
                  </FormControl>

                  <div className="w-full aspect-video p-2 border rounded-md overflow-clip bg-muted">
                    {field.value ? (
                      <Image
                        unoptimized
                        height={0}
                        width={0}
                        className="w-full aspect-video object-contain"
                        alt="logo-preview"
                        src={URL.createObjectURL(field.value)}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImageIcon className="size-16" />
                      </div>
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Benjamin" {...field} />
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
                    <Input placeholder="eg: Kirby" {...field} />
                  </FormControl>
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
                    <Input placeholder="eg: Tennyson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span></span>

            <FormField
              control={form.control}
              name="emp_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <LabelledComboBox
                      className="w-full"
                      items={employmentTypes.map((item) => ({
                        label: item.employment_type,
                        value: item.emp_type_id.toString(),
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <LabelledComboBox
                      disabled={field.disabled}
                      className="w-full"
                      items={departments.map((item) => ({
                        label: item.dpt_name,
                        value: item.department_id.toString(),
                      }))}
                      onValueChange={(val) => {
                        field.onChange(val);
                        form.resetField("designation_id");
                      }}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <LabelledComboBox
                      disabled={field.disabled || !dept_id}
                      className="w-full"
                      items={filteredDesignations.map((item) => ({
                        label: item.designation_name,
                        value: item.designation_id.toString(),
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_foreign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Origin</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "true" : "false"}
                      onValueChange={(val) => field.onChange(val === "true")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="domestic" />
                        <Label htmlFor="domestic">Domestic Hire</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="international" />
                        <Label htmlFor="international">
                          International Hire
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={updating}
              className="[&_svg]:size-4 bg-red-500 hover:bg-red-500/90 text-white gap-1 w-24"
              size="sm"
            >
              <XIcon /> Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={updating}
            size="sm"
            className="[&_svg]:size-4 bg-blue-500 hover:bg-blue-500/90 text-white gap-1 w-24"
          >
            {updating ? <Loader2 className="animate-spin" /> : <Send />}
            {updating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
