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
import { IOrganogramDB } from "@/schema/OrganogramSchema";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props extends OrgChartProps {
  charts: IOrganogramDB[];
}

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
  charts,
}: Props) {
  const { zoomIn, zoomOut, resetTransform, zoomToElement } = useControls();
  const [loading, setLoading] = useState<boolean>(false);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(true);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const saveGraph = useCallback(async () => {
    setLoading(true);

    var savedTreeData = undefined;
    const chartId = Number.parseInt(chartVersion ?? "default");
    const mChart = charts.find((item) => item.id === chartId);
    if (charts.length < 1) savedTreeData = undefined;
    else if (!mChart) savedTreeData = charts[0];
    else savedTreeData = mChart;

    console.log("Graph before", tree);
    const g = buildGraph(tree);
    console.log("Graph after", tree);

    const res = await fetch("/api/organogram", {
      method: savedTreeData ? "PATCH" : "POST",
      body: JSON.stringify({
        ...savedTreeData,
        data: JSON.stringify(g),
        company_id: companyId,
      }),
    });

    if (res.ok) {
      // alert("Saved");
      const data = await res.json();
      // router.push(`${pathname}?version=${data.data.id}`);

      setLoading(false);
      toast({
        title: "Progress Saved!",
        className: ToastSuccess,
      });
    } else {
      toast({
        title: "Failed to save progress",
        variant: "destructive",
      });
    }
    setLoading(false);
  }, [chartVersion, charts, companyId, toast, tree]);

  return (
    <div className="z-10 absolute right-0 top-0 flex flex-col gap-2 backdrop-blur">
      <div
        className={cn(
          "flex flex-col gap-2 transition-all",
          optionsOpen ? "animate-accordion-down" : "animate-accordion-up hidden"
        )}
      >
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

        <Button
          onClick={saveGraph}
          variant={"outline"}
          size="icon"
          disabled={loading}
        >
          {loading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <Icons.save />
          )}
        </Button>
      </div>

      <Button
        variant={"outline"}
        size={"icon"}
        disabled={loading}
        title="Toggle Options"
        onClick={() => setOptionsOpen((oldVal) => !oldVal)}
      >
        <Icons.chevronDown
          className={cn(
            "rotate-0 transition-all",
            optionsOpen ? "rotate-180" : ""
          )}
        />
      </Button>
    </div>
  );
}
