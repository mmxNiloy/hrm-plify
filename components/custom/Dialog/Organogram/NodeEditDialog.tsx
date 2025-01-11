"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LeaveTypeFormFragment from "../../Form/Fragment/Leave/LeaveTypeFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import {
  IOrganogramHeirarchyRecord,
  IOrganogramLevel,
  ITreeNode,
} from "@/schema/OrganogramSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IDesignation } from "@/schema/DesignationSchema";
import HeirarchyFormFragment from "../../Form/Fragment/Organogram/HeirarchyFormFragment";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { LabelledComboBox } from "@/components/ui/combobox";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "../../Multiselect";
import { Input } from "@/components/ui/input";

interface Props {
  asIcon?: boolean;
  companyId: number;
  employees: IEmployeeWithUserMetadata[];
  tree: ITreeNode[];
  parentNode?: ITreeNode;
  node?: ITreeNode;
  asMenuItem?: boolean;
  menuItemLabel?: string;
  menuItemIcon?: React.ReactNode;
  onSubmit?: ({
    parent,
    children,
  }: {
    parent?: ITreeNode;
    children: IEmployeeWithUserMetadata[];
  }) => void;
  designations: IDesignation[];
  onUpdate?: ({
    parent,
    designation,
    num_vacant,
  }: {
    parent: ITreeNode;
    designation: IDesignation;
    num_vacant: number;
  }) => void;
}

export default function NodeEditDialog({
  asIcon = false,
  companyId,
  employees,
  tree,
  onSubmit,
  parentNode,
  asMenuItem,
  menuItemLabel,
  menuItemIcon,
  node,
  onUpdate,
  designations,
}: Props) {
  const [isVacantCheck, setIsVacantCheck] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const availableNodes = useMemo(() => {
    return employees.filter((emp) => !emp.is_node);
  }, [employees]);

  const treeNodes = useMemo(() => {
    return employees.filter((emp) => emp.is_node);
  }, [employees]);

  const [filteredParents, setFilteredParents] = useState<
    IEmployeeWithUserMetadata[]
  >([]);
  const [filteredChildren, setFilteredChildren] = useState<
    IEmployeeWithUserMetadata[]
  >([]);

  // Selected children
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [childDesignation, setChildDesignation] = useState<string>();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const { parent, num_vacant, child_designation } = {
        parent:
          Number.parseInt((fd.get("parent") as string | undefined) ?? "0") || 0,
        num_vacant: (fd.get("num_vacant") as string | undefined) ?? "1",
        child_designation:
          (fd.get("child_designation") as string | undefined) ?? "0",
      };

      const desig = designations.find(
        (item) => item.designation_id.toString() === child_designation
      );
      if (!desig) {
        toast({
          title: "Node Creation Failed",
          description: "No designation selected.",
          variant: "destructive",
        });
        return;
      }

      const parNode = findParent(tree[0], parent) ?? tree[0];

      // console.log("Tree Nodes", treeNodes);
      var chNode = selectedChildren
        .map((ch) =>
          availableNodes.find((item) => item.employee_id.toString() === ch)
        )
        .filter((item) => item !== undefined);

      const nVac = Number.parseInt(num_vacant);
      if (Number.isNaN(nVac) || nVac < 1) {
        toast({
          title: "Node Creation Failed",
          description: "Vacant positions cannot be less than 1",
          variant: "destructive",
        });
        return;
      }

      if (isVacantCheck || asMenuItem) {
        // Check for an existing vacant node w\ same designation and parent
        const oldNode = parentNode?.children?.find(
          (item) =>
            item.data.is_vacant == true &&
            item.data.designation_id == desig.designation_id
        );

        if (oldNode) {
          setLoading(true);
          oldNode.data.num_vacant = nVac;
          if (onUpdate)
            onUpdate({
              parent: parentNode ?? tree[0],
              designation: desig,
              num_vacant: nVac,
            });
          setLoading(false);
          setOpen(false);
          return;
        }

        const newVacantNode: IEmployeeWithUserMetadata = {
          designations: desig,
          user: {
            access_permissions: [],
            user_id: -1,
            email: "",
            password_hash: "",
            first_name: "Vacant",
            last_name: `(${num_vacant})`,
            status: "",
            created_at: "",
            updated_at: "",
            middle_name: "",
          },
          image: "/broken-image.svg",
          employee_id: -1,
          user_id: -1,
          employee_code: "vacant",
          company_id: 0,
          ni_num: "",
          department_id: 0,
          designation_id: desig.designation_id,
          is_vacant: true,
          num_vacant: nVac,
        };

        chNode = [newVacantNode];
      }

      // No child selected
      if (chNode.length < 1) {
        toast({
          title: "Node creation failed",
          description: "Select at least one employee/node",
          variant: "destructive",
        });

        return;
      }

      setLoading(true);

      if (onSubmit) {
        onSubmit({ parent: parNode, children: [...chNode] });
      }

      setLoading(false);
      setOpen(false);
    },
    [
      asMenuItem,
      availableNodes,
      designations,
      isVacantCheck,
      onSubmit,
      onUpdate,
      parentNode,
      selectedChildren,
      toast,
      tree,
      treeNodes,
    ]
  );

  const handleParentDesignationChange = useCallback(
    (val: string) => {
      setFilteredParents(
        treeNodes.filter((item) => val === `${item.designation_id}`)
      );
    },
    [treeNodes]
  );

  const handleChildDesingationChange = useCallback(
    (val: string) => {
      setChildDesignation(val);
      setFilteredChildren(
        availableNodes.filter((item) => val === `${item.designation_id}`)
      );
    },
    [availableNodes]
  );

  useEffect(() => {
    if (!open) {
      // Reset the states
      setFilteredChildren([]);
      setFilteredParents([]);
      setSelectedChildren([]);
      setIsVacantCheck(false);
      setChildDesignation(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (parentNode) {
      setFilteredParents([parentNode.data]);
    }
  }, [parentNode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asMenuItem ? (
          <Button
            variant={"ghost"}
            size="sm"
            className="w-full gap-2 justify-start"
          >
            {menuItemIcon ?? <Icons.userPlus />}
            {menuItemLabel ?? "Add a node"}
          </Button>
        ) : asIcon ? (
          <Button variant={"outline"} size="icon">
            <Icons.userPlus />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.userPlus /> Add a node
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Node Editor</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required. <br />
            If no parent is selected, the node will be treated as a descendant
            of the root node; the company.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-2 p-4 gap-4">
              <p className="col-span-full font-semibold">Parent Node</p>

              <div className="flex flex-col gap-2">
                <Label>Select Designation</Label>
                <LabelledComboBox
                  name="parent_designation"
                  required
                  defaultValue={
                    parentNode ? `${parentNode.data.designation_id}` : undefined
                  }
                  disabled={treeNodes.length < 1}
                  items={designations.map((d) => ({
                    label: d.designation_name,
                    value: `${d.designation_id}`,
                  }))}
                  onValueChange={handleParentDesignationChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Select a Parent Node</Label>
                <LabelledComboBox
                  name="parent"
                  required
                  defaultValue={
                    parentNode ? `${parentNode.data.employee_id}` : undefined
                  }
                  disabled={filteredParents.length < 1}
                  items={filteredParents.map((n) => ({
                    label: getFullNameOfEmployee(n),
                    value: `${n.employee_id}`,
                  }))}
                />
              </div>

              <p className="col-span-full font-semibold">Child Node</p>

              <div className="flex gap-2 items-center col-span-full">
                <Checkbox
                  id="is-vacant-check"
                  onCheckedChange={(chk) => setIsVacantCheck(chk === true)}
                  defaultChecked={asMenuItem}
                />
                <Label htmlFor="is-vacant-check">Is the position vacant?</Label>
              </div>

              <div className="flex flex-col gap-2">
                <Label className={RequiredAsterisk}>Select Designation</Label>
                <LabelledComboBox
                  name="child_designation"
                  required
                  defaultValue={
                    node ? `${node.data.designation_id}` : undefined
                  }
                  disabled={availableNodes.length < 1}
                  items={designations.map((d) => ({
                    label: d.designation_name,
                    value: `${d.designation_id}`,
                  }))}
                  onValueChange={handleChildDesingationChange}
                />
              </div>

              {isVacantCheck || asMenuItem ? (
                <div className="flex flex-col gap-2">
                  <Label className={RequiredAsterisk}>
                    Number of vacant positions
                  </Label>
                  <Input
                    required
                    name="num_vacant"
                    placeholder="Number of vacant positions"
                    min={1}
                    type="number"
                    defaultValue={node?.data.num_vacant ?? 1}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Label className={RequiredAsterisk}>
                    Select a Child Node
                  </Label>
                  <MultiSelect
                    maxCount={1}
                    onValueChange={(mChildren) =>
                      setSelectedChildren(mChildren)
                    }
                    options={filteredChildren.map((emp) => ({
                      label: `${emp.employee_code} - `.concat(
                        getFullNameOfEmployee(emp)
                      ),
                      value: `${emp.employee_id}`,
                    }))}
                    disabled={filteredChildren.length < 1}
                    defaultValue={
                      node ? [`${node.data.employee_id}`] : undefined
                    }
                  />
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading || availableNodes.length < 1}
              className={ButtonSuccess}
              size="sm"
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function findParent(
  node: ITreeNode,
  parentEmpId: number
): ITreeNode | undefined {
  if (node.data.employee_id == parentEmpId) {
    return node;
  }

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const mParent = findParent(node.children[i], parentEmpId);
      if (mParent) return mParent;
    }
  }
  return undefined;
}
