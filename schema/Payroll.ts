import { IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface ISalaryStructure {
  id: number;
  employee_id: number;
  basic_salary: number;
  house_allowance: number;
  transport_allowance: number;
  medical_allowance: number;
  tax_percentage: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IEmployeeWithSalaryStructure
  extends IEmployeeWithUserMetadata {
  salaryStructure?: ISalaryStructure;
}

export interface IPaginatedEmployeeSalaryStructure extends IPaginatedResponse {
  data: IEmployeeWithSalaryStructure[];
}

export interface IBonus {
  id: number;
  payroll_id: number;
  bonus_amount: number;
  reason?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IDeduction {
  id: number;
  payroll_id: number;
  amount: number;
  deduction_reason?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IPayroll {
  id: number;
  employee_id: number;
  pay_period: Date;
  gross_salary: number;
  net_salary: number;
  tax_deduction: number;
  overtime_pay: number;
  status: "Processed" | "Pending" | "Failed";

  // Bonus and deduction refs
  bonuse?: IBonus;
  deduction?: IDeduction;
  employee?: IEmployeeWithSalaryStructure;

  created_at?: Date;
  updated_at?: Date;
}
