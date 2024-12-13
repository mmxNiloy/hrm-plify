import { ICompany } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ITreeNode } from "@/schema/OrganogramSchema";
import { OrganizationChart } from "primereact/organizationchart";

export interface OrgChartProps {
  tree: ITreeNode[];
  employees: IEmployeeWithUserMetadata[];
  companyId: number;
  company: ICompany;
  setOrgTree?: React.Dispatch<React.SetStateAction<ITreeNode[]>>;
  setEmployees?: React.Dispatch<
    React.SetStateAction<IEmployeeWithUserMetadata[]>
  >;

  designations: IDesignation[];
  canvasRef?: React.RefObject<OrganizationChart | null>;
}
