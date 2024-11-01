"use client";
import { MonthPicker } from "@/components/custom/DatePicker/MonthPicker";
import { MultiSelect } from "@/components/custom/Multiselect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { LabelledComboBox } from "@/components/ui/combobox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { IPayroll, ISalaryStructure } from "@/schema/Payroll";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import {
  dateDiffInDays,
  getFullNameOfEmployee,
  toYYYYMMDD,
  weekDays,
} from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useCallback, useState } from "react";

interface Props extends IFormFragmentProps<IPayroll> {
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
  selectedEmp?: string;
  onEmployeeSelect?: (e: string) => void;
  salaryStruct?: ISalaryStructure;
  loading?: boolean;
}

export default function PayrollFormFragment({
  data,
  readOnly,
  disabled,
  asEditable = false,
  employees = [],
  selectedEmp,
  onEmployeeSelect,
  salaryStruct,
  loading,
}: Props) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
    selectedEmp
  );

  const [bonus, setBonus] = useState<number>(data?.bonuse?.bonus_amount ?? 0);
  const [deduction, setDeduction] = useState<number>(
    data?.deduction?.amount ?? 0
  );

  // Get the bonus and deduction accordion trigger flags
  const getBDFlags = useCallback(() => {
    if (!data) return [];

    const flags = [];
    if (data.bonuse) flags.push("bonus");
    if (data.deduction) flags.push("deduction");

    return flags;
  }, [data]);

  const [bdFlags, setBDFlags] = useState<string[]>(() => getBDFlags());

  const [bonusReason, setBonusReason] = useState<string>("");
  const [deductionReason, setDeductionReason] = useState<string>("");
  const [overtimePay, setOvertimePay] = useState<number>(0);

  const getNetSalary = useCallback(() => {
    if (data) return data.net_salary;
    if (!salaryStruct) return 0;
    return (
      Number.parseFloat(`${salaryStruct.basic_salary}`) +
      Number.parseFloat(`${salaryStruct.house_allowance}`) +
      Number.parseFloat(`${salaryStruct.medical_allowance}`) +
      Number.parseFloat(`${salaryStruct.transport_allowance}`)
    );
  }, [data, salaryStruct]);

  const getGrossSalary = useCallback(() => {
    if (data) return data.gross_salary;
    return (
      getNetSalary() +
      overtimePay +
      (bdFlags.find((x) => x === "bonus") ? bonus : 0) -
      (bdFlags.find((x) => x === "deduction") ? deduction : 0)
    );
  }, [bdFlags, bonus, data, deduction, getNetSalary, overtimePay]);
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Label className={RequiredAsterisk}>Employee</Label>
        <Select
          name="employee"
          disabled={disabled || readOnly || asEditable}
          defaultValue={data ? `${data.employee_id}` : selectedEmployee}
          key={"employees-select"}
          onValueChange={onEmployeeSelect}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select an Employee"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an employee</SelectLabel>
              {employees.map((item) => (
                <SelectItem
                  key={`employee-select-option-${item.employee_id}`}
                  value={`${item.employee_id}`}
                >
                  ({item.employee_code}) - {getFullNameOfEmployee(item)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col border-l pl-4 gap-2 row-span-4">
        <p className="font-bold">Salary Structure</p>
        {loading ? (
          <div className="h-full justify-self-center self-center flex flex-col items-center justify-center gap-2">
            <Icons.spinner className="size-8 animate-spin" />
            <p className="text-sm">Loading...</p>
          </div>
        ) : salaryStruct ? (
          <>
            <div className="flex flex-col gap-2">
              <Label>Basic Salary</Label>
              <Input
                key={`basic-salary-${salaryStruct.basic_salary}`}
                defaultValue={salaryStruct.basic_salary ?? 0}
                min={0}
                name="basic_salary"
                type="number"
                placeholder="Basic Salary"
                required
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>House Allowance</Label>
              <Input
                key={`house-allowance-${salaryStruct.house_allowance}`}
                defaultValue={salaryStruct.house_allowance ?? 0}
                min={0}
                name="house_allowance"
                type="number"
                placeholder="House Allowance"
                required
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Medical Allowance</Label>
              <Input
                key={`medical-allowance-${salaryStruct.medical_allowance}`}
                defaultValue={salaryStruct.medical_allowance ?? 0}
                min={0}
                name="medical_allowance"
                type="number"
                placeholder="Medical Allowance"
                required
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Transport Allowance</Label>
              <Input
                key={`transport-allowance-${salaryStruct.transport_allowance}`}
                defaultValue={salaryStruct.transport_allowance ?? 0}
                min={0}
                name="transport_allowance"
                type="number"
                placeholder="Transport Allowance"
                required
                readOnly
              />
            </div>
          </>
        ) : (
          <div className="h-full justify-self-center self-center text-red-500 flex flex-col items-center justify-center gap-2">
            <Icons.warn className="size-8" />
            <p className="text-sm font-bold">Salary structure not found.</p>
            <p className="text-sm text-balance text-center">
              Please select an employee or create a salary structure for the
              selected employee.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Pay Period</Label>
        <MonthPicker
          required
          defaultValue={data ? toYYYYMMDD(data.pay_period) : undefined}
          name="pay_period"
          disabled={readOnly || disabled}
          key={`pay-period-${data?.pay_period}`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Net Salary</Label>
        <Input
          key={`net-salary-${getNetSalary()}`}
          defaultValue={getNetSalary()}
          min={0}
          step={0.01}
          name="net_salary"
          type="number"
          placeholder="Net Salary"
          required
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Gross Salary</Label>
        <Input
          key={`gross-salary-${getGrossSalary()}`}
          defaultValue={getGrossSalary()}
          min={0}
          step={0.01}
          name="gross_salary"
          type="number"
          placeholder="Gross Salary"
          required
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Overtime Pay</Label>
        <Input
          key={`overtime-pay-${data?.overtime_pay}`}
          defaultValue={data?.overtime_pay ?? 0}
          min={0}
          step={0.01}
          name="overtime_pay"
          type="number"
          placeholder="Overtime Pay"
          required
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => setOvertimePay(Number.parseFloat(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <Select
          disabled={readOnly || disabled}
          name="status"
          defaultValue={data?.status ?? "Pending"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Payroll Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Payroll Status</SelectLabel>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processed">Processed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Accordion
        className="col-span-full gap-4 grid grid-cols-2"
        type="multiple"
        defaultValue={bdFlags}
        onValueChange={(flags) => setBDFlags(flags)}
      >
        <AccordionItem value="bonus">
          <AccordionTrigger>Bonus</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 px-2">
            <div className="flex flex-col gap-2">
              <Label>Bonus Amount</Label>
              <Input
                defaultValue={bonus}
                name="bonus_amount"
                onChange={(e) => {
                  const val = Number.parseFloat(e.target.value);
                  if (Number.isNaN(val)) setBonus(0);
                  else setBonus(val);
                }}
                readOnly={readOnly}
                disabled={disabled}
                type="number"
                step={0.01}
                min={0}
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <Label>Reason</Label>
              <Textarea
                readOnly={readOnly}
                disabled={disabled}
                defaultValue={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
                rows={3}
                className="resize-none"
                name="bonus_reason"
                maxLength={100}
              />
              <p className="absolute bottom-1 right-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full">
                {bonusReason.length} / 100
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="deduction">
          <AccordionTrigger>Deduction</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 px-2">
            <div className="flex flex-col gap-2">
              <Label>Deduction Amount</Label>
              <Input
                defaultValue={deduction}
                name="deduction_amount"
                onChange={(e) => {
                  const val = Number.parseFloat(e.target.value);
                  if (Number.isNaN(val)) setDeduction(0);
                  else setDeduction(val);
                }}
                readOnly={readOnly}
                disabled={disabled}
                type="number"
                step={0.01}
                min={0}
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <Label>Reason</Label>
              <Textarea
                readOnly={readOnly}
                disabled={disabled}
                defaultValue={deductionReason}
                onChange={(e) => setDeductionReason(e.target.value)}
                rows={3}
                className="resize-none"
                name="deduction_reason"
                maxLength={100}
              />
              <p className="absolute bottom-1 right-2 text-xs bg-blue-500/20 px-2 py-1 rounded-full">
                {deductionReason.length} / 100
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
