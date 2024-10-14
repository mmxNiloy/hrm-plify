import { IDepartment } from "./CompanySchema";
import { IDesignation } from "./DesignationSchema";
import { IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IAttendance {
  attendance_id: number;
  company_id: number;
  employee_id: number;
  designation_id: number;
  department_id: number;
  date: Date;
  clock_in: string;
  clock_in_location: string;
  clock_out: string;
  clock_out_location: string;
  duty_hours?: number; /// Calculated by (clock out - clock in)

  emlployees?: IEmployeeWithUserMetadata;
  designations?: IDesignation;
  departments?: IDepartment;
}

export interface IPaginatedAttendance extends IPaginatedResponse {
  data: IAttendance[];
}

export interface IAttendanceRecord {
  employee_id: number;
  company_id: number;
  attendance_date: Date;
  is_present: 0 | 1 | 3; /// 0 -> Absent, 1 -> Present, 3 -> Holiday
}

export interface IAttendanceGenerationResponse {
  message: string;
  new_records: IAttendanceRecord[];
}

export interface IAttendanceReport {
  shift_id?: number;
  status_id?: number;
  is_holiday?: 0 | 1;
  is_present: 0 | 1 | 3;
  notes?: string;
  attendance_date: Date;
  employees: IEmployeeWithUserMetadata;
}
