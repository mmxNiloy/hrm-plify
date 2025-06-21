import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Skeleton } from "../skeleton";

export default function DataTableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader className="bg-site-gradient-lmr">
          <TableRow className="*:text-white text-sm sm:text-base hover:bg-site-gradient-lmr-light">
            {Array.from({ length: columns }, (_, idx) => idx).map((idx) => (
              <TableHead key={`data-table-skeleton-header-${idx}`}>
                <Skeleton className="w-full max-w-24 h-10 bg-site-gradient-lmr-light" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }, (_, idx) => idx).map((rowIdx) => (
            <TableRow key={`data-table-skeleton-row-${rowIdx}`}>
              {Array.from({ length: columns }, (_, idx) => idx).map((idx) => (
                <TableCell key={`data-table-skeleton-cell-${idx}`}>
                  <Skeleton className="w-full max-w-24 h-10" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
