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
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface ICompanyDocWithPermissions extends ICompanyDoc {
  updateAccess?: boolean;
}

interface Props {
  data: ICompanyDocWithPermissions;
}

export default function CellActions({ data }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={!data.doc_link}>
          <Link
            href={data.doc_link ?? ""}
            className="flex items-center"
            target="_blank"
          >
            <ExternalLink className="mr-2 size-4" />
            Open in a new tab
          </Link>
        </DropdownMenuItem>

        {data.updateAccess ? (
          <CompanyDocumentEditDialog
            data={data}
            company_id={data.company_id}
            variant={"ghost"}
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4"
          >
            <Edit />
            Edit
          </CompanyDocumentEditDialog>
        ) : (
          <DropdownMenuItem disabled>
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        )}

        {data.updateAccess ? (
          <CompanyDocumentDeleteAlertDialog
            document_id={data.doc_id}
            variant={"ghost"}
            className="px-2 gap-2 justify-start w-full [&_svg]:size-4 text-red-600 hover:text-red-600"
          >
            <Trash2 />
            Delete
          </CompanyDocumentDeleteAlertDialog>
        ) : (
          <DropdownMenuItem disabled>
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
