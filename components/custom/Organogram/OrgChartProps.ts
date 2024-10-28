import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ITreeNode } from "@/schema/OrganogramSchema";

export interface OrgChartProps {
  tree: ITreeNode[];
  employees: IEmployeeWithUserMetadata[];
  companyId: number;
  setOrgTree?: React.Dispatch<React.SetStateAction<ITreeNode[]>>;
  setEmployees?: React.Dispatch<
    React.SetStateAction<IEmployeeWithUserMetadata[]>
  >;
}
