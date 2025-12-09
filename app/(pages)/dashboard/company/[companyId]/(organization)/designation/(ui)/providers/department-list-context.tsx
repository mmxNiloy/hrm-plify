import { IDepartment } from "@/schema/CompanySchema";
import { createContext } from "react";

interface Props {
  departments: IDepartment[];
}

const DepartmentListContext = createContext<Props>({
  departments: [],
});

export default DepartmentListContext;
