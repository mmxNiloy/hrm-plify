import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

export interface IFingerprintDevice {
  created_at?: string;
  updated_at?: string;
  company_id: number;
  serialNum: string;
}

export interface IFingerprintDeviceEmployee {
  employee: IEmployeeWithUserMetadata;
  employee_id: number;
  serialNum: string;
  internalId: string;
}
