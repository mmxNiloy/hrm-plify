import { ITreeNode } from "@/schema/OrganogramSchema";
import { OrgChartProps } from "../OrgChartProps";

export default function deleteNodes(
  node: ITreeNode | undefined,
  {
    tree,
    companyId,
    employees,
    setOrgTree,
    setEmployees,
    company,
    designations,
  }: OrgChartProps
) {
  if (!node) return;
  if (node.children) {
    node.children.forEach((chNode) =>
      deleteNodes(chNode, {
        tree,
        companyId,
        employees,
        setOrgTree,
        setEmployees,
        designations,
        company,
      })
    );
  }

  if (setOrgTree && node.data.parent && node.data.parent.children) {
    node.data.parent.children = node.data.parent.children.filter(
      (child) => child.id != node.id
    );
    setOrgTree((oldValues) => [...oldValues]);
  }

  if (setOrgTree && !node.data.parent) {
    setOrgTree([]);
  }

  const newNode = { ...node.data };
  newNode.selfRef = undefined;
  newNode.parent = undefined;
  newNode.is_node = false;

  if (setEmployees) {
    setEmployees((oldValues) => [
      ...oldValues.filter((n) => n.employee_id != newNode.employee_id),
      newNode,
    ]);
  }
}
