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
