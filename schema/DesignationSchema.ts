import { IDepartment } from "./CompanySchema";

export interface IDesignation {
  created_at?: Date;
  updated_at?: Date;
  designation_name: string;
  company_id: number;
  designation_id: number;
  dept_id?: number;
  is_active?: boolean;
  department: IDepartment;
}
