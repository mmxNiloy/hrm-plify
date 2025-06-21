import React, { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import Link from "next/link";
import Icons from "../ui/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
