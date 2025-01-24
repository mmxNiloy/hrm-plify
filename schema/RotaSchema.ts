import { ICompanyExtraData, IDepartment } from "./CompanySchema";
import { IDesignation } from "./DesignationSchema";
import {
  IEmployee,
  IEmployeeWithPersonalInfo,
  IEmployeeWithUserMetadata,
} from "./EmployeeSchema";
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

export interface IOffDaysBase {
  id: number;
  shift_id: number;
  company_id: number;

  sunday: 0 | 1;
  monday: 0 | 1;
  tuesday: 0 | 1;
  wednesday: 0 | 1;
  thursday: 0 | 1;
  friday: 0 | 1;
  saturday: 0 | 1;
}

export interface IOffDays extends IOffDaysBase {
  created_at?: Date;
  updated_at?: Date;

  shift: IShift;
}

export interface IOffDaysWithShifts extends IOffDays {
  shifts: IShift[];
}

export interface IPaginatedOffDays extends IPaginatedResponse {
  data: IOffDays[];
  message?: string;
}

export interface ILatePolicy {
  id: number;
  num_day_allow: number;
  num_day_salary_deduct: number;
  max_grace_period_min: number;
  shift_id: number;
  department_id: number;
  designation_id: number;
  company_id: number;

  shift_db?: IShift;
  departments?: IDepartment;
  designation?: IDesignation;
}

export interface IPaginatedLatePolicy extends IPaginatedResponse {
  data: ILatePolicy[];
}

export interface IDutyRosterBase {
  roaster_id: number;
  shift_id: number;
  department_id: number;
  employee_id: number;
  designation_id: number;
  from_date: Date;
  end_date: Date;
  created_at?: Date;
  updated_at?: Date;
  company_id: number;
}

export interface IDutyRoster extends IDutyRosterBase {
  // Additional data
  departments: IDepartment;
  shift_db: IShift;
  // designation: IDesignation;
  employees: IEmployeeWithUserMetadata;
}

export interface IPaginatedDutyRosters extends IPaginatedResponse {
  data: IDutyRoster[];
  message?: string;
}

export interface IDutyRosterWithEditData extends IDutyRoster {
  company_shifts: IShift[];
  company_departments: IDepartment[];
  company_employees: IEmployeeWithUserMetadata[];
}
