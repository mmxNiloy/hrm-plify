"use client";

import { ICompanyDoc, IEmployeeDoc } from "@/schema/CompanySchema";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Edit,
  EllipsisVertical,
  ExternalLink,
  EyeIcon,
  Menu,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmployeeDocumentEditDialog from "../../components/employee-document-edit-dialog";
import EmployeeDocumentDeleteAlertDialog from "../../components/employee-document-delete-alert-dialog";

interface IEmployeeDocWithPermissions extends IEmployeeDoc {
  updateAccess?: boolean;
}

interface Props {
  data: IEmployeeDocWithPermissions;
}

export default function CellActions({ data }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="size-6 [&_svg]:size-4"
          variant={"ghost"}
          size={"icon"}
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 flex flex-col gap-1" align="end">
        {data.doc_link ? (
          <Link
            href={data.doc_link ?? ""}
            className="flex items-center"
            target="_blank"
            passHref
          >
            <Button
              size="sm"
              variant={"ghost"}
              className="px-2 gap-2 justify-start w-full [&_svg]:size-4"
            >
              <ExternalLink />
              Open in a new tab
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4"
          >
            <ExternalLink className="mr-2 size-4" />
            Open in a new tab
          </Button>
        )}

        {data.updateAccess ? (
          <EmployeeDocumentEditDialog
            data={data}
            employeeId={data.employee_id.toString()}
            variant={"ghost"}
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4"
            size="sm"
          >
            <Edit />
            Edit
          </EmployeeDocumentEditDialog>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4"
          >
            <Edit className="mr-2 size-4" />
            Edit
          </Button>
        )}

        {data.updateAccess ? (
          <EmployeeDocumentDeleteAlertDialog
            document_id={data.doc_id}
            variant={"ghost"}
            size="sm"
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4 text-red-600 hover:text-red-600"
          >
            <Trash2 />
            Delete
          </EmployeeDocumentDeleteAlertDialog>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4 text-red-600 hover:text-red-600"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
