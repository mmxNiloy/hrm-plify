import { IDepartment } from "./CompanySchema";
import { IDesignation } from "./DesignationSchema";
import { IEmployee, IEmployeeWithPersonalInfo } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IShift {
  shift_id: number;
  company_id: number;
  shift_name: string;
  start_time: string;
  end_time: string;
  break_start: string;
  break_end: string;
  created_at?: Date;
  updated_at?: Date;
}

//! Subject to change
export interface IPaginatedShift extends IPaginatedResponse {
  message: string;
  data: IShift[];
}

export interface IDutyBase {
  shift: IShift;
  department: IDepartment;
  designation: IDesignation;
}

export interface IOffDays extends IDutyBase {
  id: number;
  days: boolean[];
}

export interface IDutyRoster extends IDutyBase {
  id: number;
  employee: IEmployeeWithPersonalInfo;
  from_date?: Date;
  to_date?: Date;
}
