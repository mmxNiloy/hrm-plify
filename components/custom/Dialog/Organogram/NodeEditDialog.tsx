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
import React, { useCallback, useMemo, useState } from "react";
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
}: {
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
    child,
  }: {
    parent?: ITreeNode;
    child: IEmployeeWithUserMetadata;
  }) => void;
}) {
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const { parent, child } = {
        parent:
          Number.parseInt((fd.get("parent") as string | undefined) ?? "0") || 0,
        child:
          Number.parseInt((fd.get("child") as string | undefined) ?? "0") || 0,
      };

      const parNode =
        treeNodes.find((e) => e.employee_id == parent)?.selfRef ?? tree[0];
      const chNode = availableNodes.find((e) => e.employee_id == child);

      // No child selected
      if (!chNode) {
        toast({
          title: "Node creation failed",
          description: "Select an employee/node to be added into the chart",
          variant: "destructive",
        });

        return;
      }

      setLoading(true);

      if (onSubmit) {
        onSubmit({ parent: parNode, child: chNode });
      }

      setLoading(false);
      setOpen(false);
    },
    [availableNodes, onSubmit, toast, tree, treeNodes]
  );

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
            Fields marked by an asterisk (
            <span className="text-red-500">*</span>) are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 p-4 gap-4">
              <div className="flex flex-col gap-2">
                <Label className={RequiredAsterisk}>Select a Parent Node</Label>
                <LabelledComboBox
                  name="parent"
                  required
                  defaultValue={
                    parentNode ? `${parentNode.data.employee_id}` : undefined
                  }
                  disabled={treeNodes.length < 1}
                  items={treeNodes.map((n) => ({
                    label: getFullNameOfEmployee(n),
                    value: `${n.employee_id}`,
                  }))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className={RequiredAsterisk}>Select a Child Node</Label>
                <LabelledComboBox
                  name="child"
                  required
                  defaultValue={node ? `${node.data.employee_id}` : undefined}
                  disabled={availableNodes.length < 1}
                  items={availableNodes.map((emp) => ({
                    label: getFullNameOfEmployee(emp),
                    value: `${emp.employee_id}`,
                  }))}
                />
              </div>
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
