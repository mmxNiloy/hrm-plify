import { IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IEmployeeLeave {
  employee_id: number;
  leave_type: string;
  total: number;
  leave_taken: number;
}

export interface ILeaveBalance {
  id: number;
  employee_id: number;
  employee_code: string;
  employee_name: string;
  leave_type: string;
  leave_balance: number;
}

export interface ILeaveType {
  leave_type_id: number;
  leave_type_name: string;
  description?: string;
  leave_short_code: string;
  created_at?: Date;
  updated_at?: Date;
  company_id: number;
}

export interface ILeaveRule {
  leave_rule_id: number;
  company_id: number;
  employee_type: string;
  leave_type_id: number;
  max_number: number;
  effective_from: Date;
  effective_to?: Date;
  created_at?: Date;
  updated_at?: Date;

  leave_types?: ILeaveType;
}

export interface ILeaveApprover {
  approver_id: number;
  company_id: number;
  employee_id: number;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;

  // additional data
  employees?: IEmployeeWithUserMetadata;
}

export interface ILeaveApproverWithAllEmployees extends ILeaveApprover {
  company_employees: IEmployeeWithUserMetadata[];
}

export type TLeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";

export interface ILeaveRequest {
  leave_request_id: number;
  employee_id: number;
  leave_type_id: number;
  start_date: Date;
  end_date: Date;
  reason: string;
  status: TLeaveStatus;
  created_at?: Date;
  updated_at?: Date;
  company_id: number;

  leave_approval_status?: {
    status: TLeaveStatus;
    approval_date: Date;
    comments: string;
  };
  leave_types?: ILeaveType;
  employees?: IEmployeeWithUserMetadata;
}

export interface IPaginatedLeaveRequest extends IPaginatedResponse {
  data: ILeaveRequest[];
}

export interface ILeaveRequestWithCurrentEmployee extends ILeaveRequest {
  currentEmployee?: IEmployeeWithUserMetadata;
}
