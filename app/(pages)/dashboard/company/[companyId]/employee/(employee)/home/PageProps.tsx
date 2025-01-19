export interface EditEmployeeByIdProps {
  params: Promise<{
    companyId: number;
    employeeId: number;
  }>;
}
