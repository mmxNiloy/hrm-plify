import { IDesignation } from "./DesignationSchema";
import { IEmployeeWithUserMetadata } from "./EmployeeSchema";

export interface IOrganogramLevel {
  level_id: number;
  company_id: number;
  level_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IOrganogramHeirarchyRecord {
  heirarchy_record_id: number;
  company_id: number;
  employee_id: number;
  designation_id: number;
  level_id: number;
  reporting_authority_id: number;
  designation_reporting_authority_id: number;
  level_reporting_authority_id: number;
  created_at?: Date;
  updated_at?: Date;

  levels?: IOrganogramLevel;
  designations?: IDesignation;
  employees?: IEmployeeWithUserMetadata;
}
