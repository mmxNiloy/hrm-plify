import { IDepartment } from "./CompanySchema";
import { IDesignation } from "./DesignationSchema";
import { IEmployee, IEmployeeWithPersonalInfo } from "./EmployeeSchema";

//! Subject to change, change depends on the database
export interface IShift {
  id: number;
  shift_code: string;
  shift_description: string;
  work_in_time: string;
  work_out_time: string;
  break_time_start: string;
  break_time_end: string;
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
