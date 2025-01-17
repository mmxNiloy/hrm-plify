import { ITreeNode } from "@/schema/OrganogramSchema";
import { OrgChartProps } from "../OrgChartProps";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import { getFullNameOfEmployee } from "@/utils/Misc";
import TextCapsule from "../../TextCapsule";
import NodeEditDialog from "../../Dialog/Organogram/NodeEditDialog";
import addNode from "./addNode";
import Icons from "@/components/ui/icons";
import deleteNodes from "./deleteNode";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { buildGraph } from "./buildGraph";

export default function nodeTemplate(
  node: ITreeNode,
  {
    tree,
    companyId,
    employees,
    designations,
    setOrgTree,
    setEmployees,
    company,
  }: OrgChartProps
) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="min-w-40 max-w-72 break-words flex flex-col items-center p-4">
          <>
            {node.data.is_vacant ? (
              <Icons.employees className="size-12" />
            ) : (
              <AvatarPicker
                readOnly
                alt={getFullNameOfEmployee(node.data)}
                src={node.data.image?.replace("http", "https")}
                height={48}
                width={48}
                className="p-0 size-12 rounded-full bg-muted object-contain object-center"
              />
            )}
            <span className="font-bold text-sm">
              {getFullNameOfEmployee(node.data)}
            </span>
          </>
          {node.data.designations && (
            <TextCapsule className="bg-blue-500 text-xs">
              {node.data.designations.designation_name}
              {/* {node.is_vacant && " (Vacant)"} */}
            </TextCapsule>
          )}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="min-w-48">
        <ContextMenuItem asChild>
          <NodeEditDialog
            designations={designations}
            tree={tree}
            companyId={companyId}
            employees={employees}
            asMenuItem
            menuItemLabel="Add a child"
            parentNode={node}
            onSubmit={({ parent, children }) => {
              if (setOrgTree && setEmployees) {
                addNode({ parent, children }, setOrgTree, setEmployees);

                // saveGraph();
              }
            }}
          />
        </ContextMenuItem>
        {node.data.is_vacant && (
          <ContextMenuItem asChild>
            <NodeEditDialog
              tree={tree}
              companyId={companyId}
              employees={employees}
              asMenuItem
              asEditable
              menuItemLabel="Edit"
              menuItemIcon={<Icons.edit />}
              parentNode={node.data.parent}
              node={node}
              onSubmit={({ parent, children }) => {
                if (setOrgTree && setEmployees) {
                  addNode({ parent, children }, setOrgTree, setEmployees);
                }
              }}
              onUpdate={({ parent, designation, num_vacant }) => {
                const newTree = [...tree];
                const nPar = findNode(newTree[0], parent);
                if (nPar) {
                  var mChild = nPar.children?.find(
                    (item) =>
                      item.data.employee_id == -1 &&
                      item.data.is_vacant == true &&
                      item.data.designation_id == designation.designation_id
                  );
                  if (mChild) {
                    mChild.data.num_vacant = num_vacant;
                    mChild.data.user.last_name = `(${num_vacant})`;
                  }
                }
                if (setOrgTree) setOrgTree(newTree);
              }}
              designations={designations}
            />
          </ContextMenuItem>
        )}
        {node.id !== tree[0].id && (
          <ContextMenuItem
            onClick={() =>
              deleteNodes(node, {
                tree,
                companyId,
                employees,
                setOrgTree,
                setEmployees,
                designations,
                company,
              })
            }
            className="text-red-500 focus:text-red-600 gap-2 items-center"
          >
            <Icons.trash />
            Delete
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

function findNode(tree: ITreeNode, node: ITreeNode): ITreeNode | undefined {
  if (tree.id === node.id) return tree;
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const fNode = findNode(tree.children[i], node);
      if (fNode) return fNode;
    }
  }

  return undefined;
}
