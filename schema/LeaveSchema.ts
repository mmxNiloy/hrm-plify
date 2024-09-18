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
  leave_type: string;
  leave_short_code: string;
  remarks?: string;
}
