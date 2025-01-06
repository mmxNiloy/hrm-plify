import React, { useCallback, useRef, useState } from "react";
import { OrgChartProps } from "./OrgChartProps";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import NodeEditDialog from "../Dialog/Organogram/NodeEditDialog";
import { useControls } from "react-zoom-pan-pinch";
import addNode from "./util/addNode";
import Link from "next/link";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { buildGraph } from "./util/buildGraph";
import OrgChartReportGenerator from "../PDF/OrgChartReportGenerator";
import OrgChartWordGenerator from "../Doc/OrgChartWordGenerator";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function CanvasControls({
  employees,
  tree,
  companyId,
  setOrgTree,
  setEmployees,
  designations,
  canvasRef,
  company,
  chartVersion,
}: OrgChartProps) {
  const { zoomIn, zoomOut, resetTransform, zoomToElement } = useControls();

  const { toast } = useToast();

  const saveGraph = useCallback(async () => {
    console.log("Graph before", tree);
    const g = buildGraph(tree);
    console.log("Graph after", tree);

    localStorage.setItem(
      `organogram${
        chartVersion && chartVersion !== "default" ? `_${chartVersion}` : ""
      }`,
      JSON.stringify(g)
    );

    toast({
      title: "Progress Saved!",
      className: ToastSuccess,
    });
  }, [chartVersion, toast, tree]);

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
        designations={designations}
        tree={tree}
        companyId={companyId}
        employees={employees}
        asIcon
        onSubmit={({ parent, children }) => {
          if (setOrgTree && setEmployees) {
            addNode({ parent, children }, setOrgTree, setEmployees);

            // saveGraph();
          }
        }}
      />

      <OrgChartReportGenerator canvasRef={canvasRef} company={company} />

      <OrgChartWordGenerator canvasRef={canvasRef} company={company} />

      <Button onClick={saveGraph} variant={"outline"} size="icon">
        <Icons.save />
      </Button>
    </div>
  );
}
