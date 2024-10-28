import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ITreeNode } from "@/schema/OrganogramSchema";

export default function addNode(
  { parent, child }: { parent?: ITreeNode; child: IEmployeeWithUserMetadata },
  setOrgTree: React.Dispatch<React.SetStateAction<ITreeNode[]>>,
  setEmployees: React.Dispatch<
    React.SetStateAction<IEmployeeWithUserMetadata[]>
  >
) {
  console.log("Root node selected", child);
  const newRoot = {
    data: { ...child },
    expanded: true,
    children: [],
    key: `Employee-key-${child.employee_id}`,
    id: `Employee-id-${child.employee_id}`,
  };
  newRoot.data.parent = parent;
  newRoot.data.is_node = true;
  newRoot.data.selfRef = newRoot;

  setEmployees((oldValues) => [
    ...oldValues.filter((val) => val.employee_id != child.employee_id),
    newRoot.data,
  ]);

  console.log("Parent Node: ", parent);
  console.log("Child Node: ", child);

  if (!parent) {
    // A root node (can also be a forest?)
    setOrgTree((oldTree) => [...oldTree, newRoot]);
  } else {
    if (!parent.children) parent.children = [];
    parent.children.push(newRoot);

    setOrgTree((oldTree) => [...oldTree]);
  }
}
