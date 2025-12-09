import React, { HTMLAttributes } from "react";
import { DataTableError } from "../ui/data-table/data-table-error";

const AccessDenied = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <DataTableError errorMessage="Access Denied! You don't have enough clearance to access this page." />
  );
});

AccessDenied.displayName = "AccessDenied";

export default AccessDenied;
