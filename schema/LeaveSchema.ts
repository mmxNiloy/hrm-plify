export interface IEmployeeLeave {
  employee_id: number;
  leave_type: string;
  total: number;
  leave_taken: number;
}

export interface ILeaveBalance {
  employee_id: number;
  employee_name: string;
  designation: string;
  leaves: IEmployeeLeave[];
}

export interface ILeaveType {
  leave_type_id: number;
  leave_type: string;
  leave_short_code: string;
  remarks?: string;
}
