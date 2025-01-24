"use client";

import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ILatePolicy, IOffDaysWithShifts, IShift } from "@/schema/RotaSchema";
import { ColumnDef } from "@tanstack/react-table";
import OffDaysEditDialog from "../../../Dialog/Rota/OffDaysEditDialog";
import LatePolicyEditDialog from "@/components/custom/Dialog/Rota/LatePolicyEditDialog";
import { ICompanyExtraData, IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";

interface Props extends ILatePolicy {
  updateAccess?: boolean;
  companyExtra: ICompanyExtraData;
}

export const LatePolicyDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "shift-name-column",
    header: ({ column }) => <SortableHeader name="Shift" column={column} />,
    cell: ({ row }) => row.original.shift_db?.shift_name,
  },
  {
    id: "department-name-column",
    header: ({ column }) => (
      <SortableHeader name="Department" column={column} />
    ),
    cell: ({ row }) => row.original.departments?.dpt_name,
  },
  {
    id: "designation-name-column",
    header: ({ column }) => (
      <SortableHeader name="Designation" column={column} />
    ),
    cell: ({ row }) => row.original.designation?.designation_name,
  },
  {
    accessorKey: "max_grace_period_min",
    header: ({ column }) => (
      <SortableHeader name="Max Grace Period (In Minutes)" column={column} />
    ),
  },
  {
    accessorKey: "num_day_allow",
    header: ({ column }) => (
      <SortableHeader name="Days Allowed" column={column} />
    ),
  },
  {
    accessorKey: "num_day_salary_deduct",
    header: ({ column }) => (
      <SortableHeader name="Salary Deduction Days" column={column} />
    ),
  },
  {
    id: "edit-action",
    header: "Edit action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <LatePolicyEditDialog
          {...row.original.companyExtra}
          company_id={row.original.company_id}
          asIcon
          data={row.original}
        />
      ),
  },
];
