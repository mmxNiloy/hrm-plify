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

export default function nodeTemplate(
  node: ITreeNode,
  { tree, companyId, employees, setOrgTree, setEmployees }: OrgChartProps
) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="min-w-40 max-w-48 flex flex-col items-center p-4">
          <Image
            alt={getFullNameOfEmployee(node.data)}
            src={
              node.data.image ??
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4="
            }
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAEQUlEQVR4Xu2cjXHUMBCFkw6gA6cD6CBUQKiAowOogEkF0AHXAaECoALogOsAOoB9gzUYWz+rXd1aPq9mNJdJtLL0+WklrXS5vvKkInCtsnbjKweoFIEDdIBKAkrzGgU+omc9ofxy/BzoE7+7hPSLOoH8nfInykdup7gAb6nCdyM4bt1bLneixt9zQHIAAtzrLdNQtP092b7J2ZcA7hle4PZAP7xIQcwBvCOjj4q3d0mmAAiQi5QCiMnh8458XullY4J5XAPQ1bek9So2qaQUiKELiJ7+EYj6whTAH2Q3OL3/CESHcQrgTzK9lEVySx0seKUA/mY+tbQMYlazejFxfx3g33fnAJUadoAOUElAae4KdIBKAkpzV6ADVBJQmrsC9wbwljo8PVsRnUcooU3NN6NA7K8/UM5FenCwgwDmqSGgUlWbADhQLxCkxWcpQZFPDSFuAiDgYehyExR4wy2sLNc9QGmEOxoFVsKKmXcPUBrhzp6INQTZPUBphDt5mNMQHqriAKw6E+FUiAdzA6rc+mJcuM/QMC21L+lKrAKqUgVaTSQ5gFk/bAUQa7+DQCJr+8DiJGYFEPAAsTbhXgrup5w7xRRYhJfzYSWfEDpU45++kRGux3ETdiTPKGMiOXea95cFzxogtnHwhZzjUkADPEC0SFOAbHjWAPG8gTLWhDklrrkXroK3BsCgJtw3fD6ChCLn0RiLYTtVNhRYDW9NgC2GZYjsoONa4Aeq4yhplNUsLGlbzmYaFsOQR+RmlbRVgPN15Reih0nHPG0RIPwnrh7PE9aL2fvM56C7NYApeIGNaCLQgLUEGPxW8sJ2oSNw9FBeaR2ZvM+sAUW2eHmLXZElwBATlPgrrBsR0S7BC4wwqbRchAflL3hZAZx/XeJIHcRw46RhhIdPbmq5k5m6jVUApvwWx19BcVBezR46QD7RD1CiZo04b7s5wNLQw9IDQzqWpms9rvLm5TRrxNiLNwWIIYcITM5v5YaaNIY4hchReezlpEaNGcCaoYehdjPrRWm5wlFka3h4phnA2lM4DOOwk+gVnhlA6RcUj9TCr5Q5a72cAs+hvPA8EwVyo9kxCPCJ3LVezP6c8MwUqAHI8W2pMlJ4qI/b5u4VKAWogbd7gFp4uwbYAt5uAbaC1x1AqR9b066rSWRNENJnO0ApudHOATpAJQGleXMF9vSVf+ls2yIoMX8v7J2I9EKkUggL857gnah187Bb8opui2CmFmZP8NCXB8qLE8XUodKBCksuRGqhBfve4KFd0cueKYAwWGsY9wgPYTYM38UBVQ7gHRlY//OxHuEl1Yc/5ADi75a+sFd4uI2QvHNTAgiI0hB9jT/sGd59bOiGznEAoiwmlbeUhxoqzLI9woOvA7jFXZh5n7gAgx0Wp7iaC5AtYPYED9BwEB/+CS3rRkMtQKao9lPMASrftQN0gEoCSnNXoBLgHzpnEWCfcnHwAAAAAElFTkSuQmCC"
            height={48}
            width={48}
            className="size-12 rounded-full bg-muted object-contain object-center"
          />
          <span className="font-bold">{getFullNameOfEmployee(node.data)}</span>
          {node.data.designations && (
            <TextCapsule>{node.data.designations.designation_name}</TextCapsule>
          )}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="min-w-48">
        <ContextMenuItem asChild>
          <NodeEditDialog
            tree={tree}
            companyId={companyId}
            employees={employees}
            asMenuItem
            menuItemLabel="Add a child"
            parentNode={node}
            onSubmit={({ parent, child }) => {
              if (setOrgTree && setEmployees) {
                addNode({ parent, child }, setOrgTree, setEmployees);
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
