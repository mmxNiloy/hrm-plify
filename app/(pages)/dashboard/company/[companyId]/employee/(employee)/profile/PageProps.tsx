export interface EditEmployeeByIdProps {
  params: Promise<{
    companyId: string;
    employeeId: string;
  }>;
}
