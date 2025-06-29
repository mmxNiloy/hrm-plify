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
  record_id?: number;
  employee_id: number;
  company_id: number;
  attendance_date: Date;
  check_in_time?: Date;
  check_out_time?: Date;
  is_present: number; /// 0 -> Absent, 1 -> Present, 2-> Weekend, 3 -> Holiday
}

export interface IAttendanceGenerationResponse {
  message: string;
  updated_records: IAttendanceRecord[];
}

export interface IAttendanceReport {
  record_id?: number;
  shift_id?: number;
  status_id?: number;
  is_holiday?: number;
  is_present: number;
  notes?: string;
  attendance_date: Date;
  employees: IEmployeeWithUserMetadata;
  check_in_time?: Date;
  check_out_time?: Date;
}

export interface IPaginatedAttendanceReport extends IPaginatedResponse {
  data: IAttendanceReport[];
}

export interface IPaginatedAttendanceRecords extends IPaginatedResponse {
  data: IAttendanceRecord[];
}
