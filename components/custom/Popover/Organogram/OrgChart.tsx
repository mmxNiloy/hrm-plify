"use client";

import React, { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { ITreeNode } from "@/schema/OrganogramSchema";
import Image from "next/image";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { getFullNameOfEmployee } from "@/utils/Misc";
import TextCapsule from "../../TextCapsule";
import { ButtonBlue } from "@/styles/button.tailwind";
import NodeEditDialog from "../../Dialog/Organogram/NodeEditDialog";

const nodeTemplate = (node: ITreeNode) => {
  return (
    <div className="min-w-40 max-w-48 flex flex-col items-center">
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
  );
};

interface Props {
  tree: ITreeNode[];
  employees: IEmployeeWithUserMetadata[];
  companyId: number;
  setOrgTree?: React.Dispatch<React.SetStateAction<ITreeNode[]>>;
  setEmployees?: React.Dispatch<
    React.SetStateAction<IEmployeeWithUserMetadata[]>
  >;
}

function addNode(
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
  newRoot.data.parent = newRoot;

  setEmployees((oldValues) => [
    ...oldValues.filter((val) => val.employee_id != child.employee_id),
    Object.assign(
      { ...oldValues.find((val) => val.employee_id == child.employee_id)! },
      { is_node: true }
    ),
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

function CanvasControls({
  employees,
  tree,
  companyId,
  setOrgTree,
  setEmployees,
}: Props) {
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

      {/* TODO: Add a new node on click */}
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

export default function OrgChart({ tree, employees, companyId }: Props) {
  const [emp, setEmp] = useState<IEmployeeWithUserMetadata[]>([...employees]);

  const [orgTree, setOrgTree] = useState<ITreeNode[]>([]);

  useEffect(() => {
    console.log("Org tree", orgTree);
  }, [orgTree]);

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
          initialPositionX={0}
          initialPositionY={0}
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
              <TransformComponent wrapperClass="min-w-full min-h-[calc(100vh-16rem)] items-center justify-center">
                <OrganizationChart
                  value={orgTree}
                  nodeTemplate={nodeTemplate}
                  pt={{
                    node: {
                      className: "rounded-md",
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
