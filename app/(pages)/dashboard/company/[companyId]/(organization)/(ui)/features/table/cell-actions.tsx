import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICompanyDoc } from "@/schema/CompanySchema";
import React from "react";
import CompanyDocumentEditDialog from "../../components/company-document/company-document-edit-dialog";
import CompanyDocumentDeleteAlertDialog from "../../components/company-document-delete-alert-dialog";
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

interface ICompanyDocWithPermissions extends ICompanyDoc {
  updateAccess?: boolean;
}

interface Props {
  data: ICompanyDocWithPermissions;
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
          <CompanyDocumentEditDialog
            data={data}
            companyId={data.company_id.toString()}
            variant={"ghost"}
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4"
            size="sm"
          >
            <Edit />
            Edit
          </CompanyDocumentEditDialog>
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
          <CompanyDocumentDeleteAlertDialog
            document_id={data.doc_id}
            variant={"ghost"}
            size="sm"
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4 text-red-600 hover:text-red-600"
          >
            <Trash2 />
            Delete
          </CompanyDocumentDeleteAlertDialog>
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
