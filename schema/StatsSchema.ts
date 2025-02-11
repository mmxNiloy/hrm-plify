export interface IEmployeeTypeCount {
  total_employees: string; // Because we cannot serialize big ints normally.
  employment_type: string;
  emp_type_id?: number;
}

export interface ICompanyEmployeeStats {
  totalEmployees: number;
  foreignEmployees: number;
  empTypeCounts: IEmployeeTypeCount[];
}

export interface IEmployeeLeaveStats {
  total: number;
  data: { status: string; freq: number }[];
}

export interface IEmployeeAttendanceStats {
  total: number;
  data: { is_present: number; freq: number }[];
}
