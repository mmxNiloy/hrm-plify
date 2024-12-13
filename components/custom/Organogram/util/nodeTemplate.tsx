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
  const saveGraph = async () => {
    const g = buildGraph(tree);

    localStorage.setItem("organogram", JSON.stringify(Array.from(g.entries())));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="min-w-40 max-w-72 break-words flex flex-col items-center p-4">
          <AvatarPicker
            readOnly
            alt={getFullNameOfEmployee(node.data)}
            src={node.data.image}
            height={48}
            width={48}
            className="p-0 size-12 rounded-full bg-muted object-contain object-center"
          />
          <span className="font-bold text-sm">
            {getFullNameOfEmployee(node.data)}
          </span>
          {node.data.designations && (
            <TextCapsule className="bg-blue-500 text-xs">
              {node.data.designations.designation_name}
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
            onSubmit={({ parent, child }) => {
              if (setOrgTree && setEmployees) {
                addNode({ parent, child }, setOrgTree, setEmployees);

                // saveGraph();
              }
            }}
          />
        </ContextMenuItem>
        {/* <ContextMenuItem asChild>
            <NodeEditDialog
              tree={tree}
              companyId={companyId}
              employees={employees}
              asMenuItem
              menuItemLabel="Edit"
              menuItemIcon={<Icons.edit />}
              parentNode={node.data.parent}
              node={node}
              onSubmit={({ parent, child }) => {
                if (setOrgTree && setEmployees) {
                  addNode({ parent, child }, setOrgTree, setEmployees);
                }
              }}
            />
          </ContextMenuItem> */}
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
      </ContextMenuContent>
    </ContextMenu>
  );
}
