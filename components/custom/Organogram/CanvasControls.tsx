import React from "react";
import { OrgChartProps } from "./OrgChartProps";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import NodeEditDialog from "../Dialog/Organogram/NodeEditDialog";
import { useControls } from "react-zoom-pan-pinch";
import addNode from "./util/addNode";

export default function CanvasControls({
  employees,
  tree,
  companyId,
  setOrgTree,
  setEmployees,
}: OrgChartProps) {
  const { zoomIn, zoomOut, resetTransform, zoomToElement } = useControls();
  return (
    <div className="z-10 absolute right-0 top-0 flex flex-col gap-2">
      <Button
        variant="outline"
        onClick={() => {
          zoomIn();
        }}
        size="icon"
        title="Zoom In"
      >
        <Icons.zoomIn />
      </Button>

      <Button
        onClick={() => {
          zoomOut();
        }}
        variant="outline"
        size="icon"
        title="Zoom Out"
      >
        <Icons.zoomOut />
      </Button>

      <Button
        onClick={() => {
          resetTransform();
        }}
        variant="outline"
        size="icon"
        title="Reset"
      >
        <Icons.reset />
      </Button>

      <NodeEditDialog
        tree={tree}
        companyId={companyId}
        employees={employees}
        asIcon
        onSubmit={({ parent, child }) => {
          if (setOrgTree && setEmployees) {
            addNode({ parent, child }, setOrgTree, setEmployees);
          }
        }}
      />
    </div>
  );
}
