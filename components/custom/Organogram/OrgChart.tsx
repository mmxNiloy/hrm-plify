"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { buildGraph, rebuildGraph } from "./util/buildGraph";
import { useSearchParams } from "next/navigation";

export default function OrgChart({
  employees,
  companyId,
  designations,
  company,
}: Omit<OrgChartProps, "tree">) {
  const sParams = useSearchParams();

  const [chartVersion, setChartVersion] = useState<string>("");

  useEffect(() => {
    setChartVersion(decodeURIComponent(sParams.get("version") ?? "default"));
  }, [sParams]);

  const [emp, setEmp] = useState<IEmployeeWithUserMetadata[]>([...employees]);

  const findChildren = useCallback(
    (treeMap: Number[][], parent: Number): ITreeNode[] => {
      const kids = treeMap.filter((item) => item[1] == parent);
      const kidsData = kids
        .map((item) => employees.find((e) => e.employee_id == item[0]))
        .filter((item) => item !== undefined);
      return kidsData.map((k) => {
        const node = {
          data: k,
          children: findChildren(treeMap, k.employee_id),
          expanded: true,
        } as ITreeNode;

        node.children?.forEach((item) => {
          item.data.parent = node;
        });

        return node;
      });
    },
    [employees]
  );

  const restoreTree = useCallback(() => {
    var storedTree: ITreeNode | undefined = undefined;
    try {
      const savedTreeData = localStorage.getItem(
        `organogram${
          chartVersion && chartVersion !== "default" ? `_${chartVersion}` : ""
        }`
      );
      if (savedTreeData) {
        storedTree = JSON.parse(savedTreeData) as ITreeNode;
      } else {
        storedTree = undefined;
      }
    } catch (err) {
      storedTree = undefined;
    }

    if (storedTree === undefined) {
      const companyRoot: ITreeNode = {
        id: `company-${company.company_id}`,
        key: `company-key-${company.company_id}`,
        children: [],
        expanded: true,
        data: {
          user: {
            access_permissions: [],
            user_id: 0,
            email: company.website ?? "",
            password_hash: "",
            first_name: company.company_name,
            last_name: "",
            status: "",
            created_at: "",
            updated_at: "",
            middle_name: "",
          },
          image: company.logo,
          employee_id: 0,
          user_id: 0,
          employee_code: "",
          company_id: 0,
          ni_num: "",
          department_id: 0,
          designation_id: 0,
          is_vacant: false,
          is_root: true,
        },
      };
      return { tree: [companyRoot] as ITreeNode[], employees };
    }

    const { graph: newTree, nodes } = rebuildGraph(storedTree);

    return {
      tree: newTree,
      employees: employees.map((e) => ({
        ...e,
        is_node: nodes.find((item) => item == e.employee_id) !== undefined,
      })),
    };
  }, [
    chartVersion,
    company.company_id,
    company.company_name,
    company.logo,
    company.website,
    employees,
  ]);

  const [orgTree, setOrgTree] = useState<ITreeNode[]>([]);

  const canvasRef = useRef<OrganizationChart>(null);

  const saveGraph = useCallback(async () => {
    const g = buildGraph(orgTree);

    localStorage.setItem("organogram", JSON.stringify(g));
  }, [orgTree]);

  useEffect(() => {
    const { tree, employees } = restoreTree();
    setOrgTree(tree);
    setEmp(employees);
  }, [restoreTree]);

  if (orgTree.length < 1) {
    return (
      <div className="relative w-full h-[calc(100vh-16rem)] flex flex-col gap-2 items-center justify-center">
        <Icons.info className="size-16" />
        <p>Add nodes to create an Organogram Chart</p>
        <NodeEditDialog
          designations={designations}
          onSubmit={({ parent, children }) => {
            addNode({ parent, children }, setOrgTree, setEmp);

            // saveGraph();
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
                  designations,
                  canvasRef,
                  company,
                  chartVersion,
                }}
              />

              <TransformComponent wrapperClass="min-w-full max-w-full min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] items-center justify-center">
                <OrganizationChart
                  id="organogram-chart"
                  ref={canvasRef}
                  value={orgTree}
                  nodeTemplate={(n) =>
                    nodeTemplate(n as ITreeNode, {
                      tree: orgTree,
                      employees: emp,
                      setOrgTree,
                      setEmployees: setEmp,
                      companyId,
                      designations,
                      company,
                    })
                  }
                  pt={{
                    node: {
                      className: "rounded-md p-0",
                      onDoubleClick: (e) => {
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
