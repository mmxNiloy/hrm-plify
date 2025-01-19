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
