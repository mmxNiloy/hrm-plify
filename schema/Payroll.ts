import { IEmployeeWithUserMetadata } from "./EmployeeSchema";

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

  employees?: IEmployeeWithUserMetadata;
}
