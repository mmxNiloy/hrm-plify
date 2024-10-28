"use client";

import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { ITreeNode } from "@/schema/OrganogramSchema";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import Icons from "@/components/ui/icons";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import NodeEditDialog from "../Dialog/Organogram/NodeEditDialog";
import { OrgChartProps } from "./OrgChartProps";
import addNode from "./util/addNode";
import CanvasControls from "./CanvasControls";
import nodeTemplate from "./util/nodeTemplate";
import { useToast } from "@/components/ui/use-toast";

export default function OrgChart({
  employees,
  companyId,
}: Omit<OrgChartProps, "tree">) {
  const [emp, setEmp] = useState<IEmployeeWithUserMetadata[]>([...employees]);

  const [orgTree, setOrgTree] = useState<ITreeNode[]>([]);

  if (orgTree.length < 1) {
    return (
      <div className="relative w-full h-[calc(100vh-16rem)] flex flex-col gap-2 items-center justify-center">
        <Icons.info className="size-16" />
        <p>Add nodes to create an Organogram Chart</p>
        <NodeEditDialog
          onSubmit={({ parent, child }) => {
            addNode({ parent, child }, setOrgTree, setEmp);
          }}
          tree={orgTree}
          companyId={companyId}
          employees={emp}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: Tailwind,
          ptOptions: {
            mergeSections: true,
            mergeProps: true,
            classNameMergeFunction: twMerge,
          },
        }}
      >
        <TransformWrapper
          minScale={0.5}
          maxScale={2}
          initialScale={1}
          centerOnInit
        >
          {({ zoomIn, zoomOut, zoomToElement, ...props }) => (
            <>
              <CanvasControls
                {...{
                  tree: orgTree,
                  companyId,
                  employees: emp,
                  setOrgTree,
                  setEmployees: setEmp,
                }}
              />
              <TransformComponent wrapperClass="min-w-full max-w-full min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] items-center justify-center">
                <OrganizationChart
                  value={orgTree}
                  nodeTemplate={(n) =>
                    nodeTemplate(n as ITreeNode, {
                      tree: orgTree,
                      employees: emp,
                      setOrgTree,
                      setEmployees: setEmp,
                      companyId,
                    })
                  }
                  pt={{
                    node: {
                      className: "rounded-md p-0",
                      onClick: (e) => {
                        zoomToElement(e.currentTarget);
                      },
                    },
                  }}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </PrimeReactProvider>
    </div>
  );
}
