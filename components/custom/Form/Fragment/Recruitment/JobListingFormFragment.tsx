"use client";
import { generateJobDescription } from "@/app/(server)/actions/generateJobDescription";
import { MonthPicker } from "@/components/custom/DatePicker/MonthPicker";
import { MultiSelect } from "@/components/custom/Multiselect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LabelledComboBox } from "@/components/ui/combobox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { IJobListing } from "@/schema/JobSchema";
import { IPayroll, ISalaryStructure } from "@/schema/Payroll";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import {
  dateDiffInDays,
  getFullNameOfEmployee,
  toYYYYMMDD,
  weekDays,
} from "@/utils/Misc";
import { generateHash } from "@/utils/Security";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useCallback, useEffect, useState } from "react";

interface Props extends IFormFragmentProps<IJobListing> {
  companyId: number;
  companyData: ICompanyExtraData;
}

export default function JobListingFormFragment({
  data,
  readOnly,
  disabled,
  companyId,
  companyData,
}: Props) {
  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [department, setDepartment] = useState<string>(
    companyData.departments.find(
      (item) => `${item.department_id}` === `${data?.dept_id}`
    )?.dpt_name ?? ""
  );
  const [designation, setDesignation] = useState<string>(
    companyData.designations.find(
      (item) => `${item.designation_id}` === `${data?.designation_id}`
    )?.designation_name ?? ""
  );
  const [deadline, setDeadline] = useState<string>(
    data?.lastDate.toString() ?? ""
  );

  const [jobDesc, setJobDesc] = useState<string>(data?.desc ?? "");

  const onJobDescChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const desc = e.currentTarget.value;
      if (desc.length > 5000) return;
      setJobDesc(desc);
    },
    []
  );

  const [loadingJobDesc, setLoadingJobDesc] = useState<boolean>(false);
  const { toast } = useToast();

  const generateJobDesc = useCallback(async () => {
    setLoadingJobDesc(true);

    const { data, error } = await generateJobDescription({
      title,
      designation,
      deadline,
      department,
    });
    if (error) {
      toast({
        title: "Failed to generate job description",
        variant: "destructive",
      });
    } else {
      setJobDesc(data.result);
    }

    setLoadingJobDesc(false);
  }, [deadline, department, designation, title, toast]);

  return (
    <>
      <div className="flex flex-col gap-2 w-full col-span-full">
        <Label className={RequiredAsterisk}>Job Title</Label>
        <Input
          key={`job-title-${data?.title}`}
          defaultValue={data?.title}
          name="title"
          placeholder="Job Title"
          required
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <Label className={RequiredAsterisk}>Department</Label>
        <Select
          name="dept_id"
          disabled={disabled || readOnly}
          defaultValue={data ? `${data.dept_id}` : undefined}
          key={`dept-select-${data?.dept_id}`}
          onValueChange={(e) =>
            setDepartment(
              companyData.departments.find(
                (item) => `${item.department_id}` === e
              )?.dpt_name ?? ""
            )
          }
          required
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Department"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a department</SelectLabel>
              {companyData.departments.map((item) => (
                <SelectItem
                  key={`department-select-option-${item.department_id}`}
                  value={`${item.department_id}`}
                >
                  {item.dpt_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <Label className={RequiredAsterisk}>Designation</Label>
        <Select
          name="designation_id"
          disabled={disabled || readOnly}
          defaultValue={data ? `${data.designation_id}` : undefined}
          key={`designation-select-${data?.designation_id}`}
          required
          onValueChange={(e) =>
            setDesignation(
              companyData.designations.find(
                (item) => `${item.designation_id}` === e
              )?.designation_name ?? ""
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Designation"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a designation</SelectLabel>
              {companyData.designations.map((item) => (
                <SelectItem
                  key={`department-select-option-${item.designation_id}`}
                  value={`${item.designation_id}`}
                >
                  {item.designation_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <Label className={RequiredAsterisk}>Job Code</Label>
        <Input
          name="jobCode"
          required
          defaultValue={data?.jobCode}
          placeholder="Job Code"
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <Label className={RequiredAsterisk}>Deadline</Label>
        <Input
          name="lastDate"
          type="date"
          required
          defaultValue={data ? toYYYYMMDD(new Date(data.lastDate)) : undefined}
          onChange={(e) => setDeadline(e.currentTarget.value)}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <Label>Publishing Status</Label>
        <RadioGroup
          defaultValue={data ? `${data.isPublished}` : "0"}
          name="isPublished"
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="0" id="status-unpublished" />
            <Label htmlFor="status-unpublished">Unpublished</Label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupItem value="1" id="status-published" />
            <Label htmlFor="status-published">Published</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <Label>Status</Label>
        <RadioGroup defaultValue={data ? `${data.status}` : "0"} name="status">
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="0" id="status-inactive" />
            <Label htmlFor="status-inactive">Inactive</Label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupItem value="1" id="status-active" />
            <Label htmlFor="status-active">Active</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="relative flex flex-col gap-2 w-full col-span-full">
        <div className="flex items-center justify-between">
          <Label className={RequiredAsterisk}>Job Description</Label>
          <Button
            type="button"
            variant={"link"}
            disabled={
              title.length < 1 ||
              designation.length < 1 ||
              department.length < 1 ||
              deadline.length < 1
            }
            // title={
            //   title.length < 1
            //     ? "Please enter a title"
            //     : designation.length < 1
            //     ? "Please select a designation"
            //     : department.length < 1
            //     ? "Please select a department"
            //     : deadline.length < 1
            //     ? "Please select a deadline"
            //     : ""
            // }
            className="text-blue-500 hover:text-blue-400 gap-2"
            onClick={generateJobDesc}
          >
            <Icons.sparkles className="size-5" /> Auto-generate
          </Button>
        </div>
        <Textarea
          className="resize-none"
          key={`job-description-${data?.desc}`}
          value={jobDesc}
          rows={10}
          name="desc"
          placeholder="Job Description"
          required
          onChange={onJobDescChange}
          readOnly={readOnly}
          disabled={disabled || loadingJobDesc}
        />
        {loadingJobDesc && (
          <div className="absolute z-[9999] w-full h-full top-0 left-0 bg-slate-300/50 backdrop-blur-sm flex flex-col gap-2 items-center justify-center rounded-md">
            <Icons.spinner className="animate-spin ease-in-out" />
            Generating...
          </div>
        )}
        <p className="px-2 py-1 bg-slate-300/50 backdrop-blur-sm rounded-full absolute bottom-2 right-2 text-xs z-50">
          {jobDesc.length} / 5000
        </p>
      </div>
    </>
  );
}
